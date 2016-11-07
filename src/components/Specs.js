'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'

import F8Header from '../common/F8Header'
import {LoadingView, ErrorView} from '../components'
import MultipleChoice from 'react-native-multiple-choice'
import keys from 'lodash/keys'
import { FilterStyles } from '../styles'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { addSpecToHistory } from '../reducers/history/historyActions'
import { setSpecId } from '../reducers/car/filterActions'

const mapStateToProps = (state) => {
  let specIds = keys(state.entities.specs).sort(),
      specs = specIds.map ((id)=>state.entities.specs[id])

  return {
    specs,
  }
}

class SpecsList extends Component {

  constructor (props) {
    super (props)
    this.state = {
      specs: props.specs,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {specs, isFetching} = this.props
    this.setState ({specs, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {specs} = nextProps,
        isFetching = specs.length?false:true
    this.setState ({specs, isFetching})
  }

  render () {
    let {specs, isFetching} = this.state,
        {onSelectSpec} = this.props
    const leftItem = {
            icon: require ('../common/img/back.ios.png'),
            onPress: ()=>Actions.pop(),
          },
    content = isFetching?(<LoadingView/>):(
                <ScrollView style={FilterStyles.optionsContainer}>
                  <MultipleChoice
                    maxSelectedOptions={1}
                    renderText={(option)=> {
                        let {
                         cylinders, compressor, configuration,
                         transmissionSpeed, transmission, drivenWheels,size,
                         specId, horsepower
                         } = option
                        return (
                          <TouchableOpacity onPress={()=>{
                            onSelectSpec (option, specId)
                          }}>
                          <Text style={FilterStyles.multipleChoiceText}>
                            { `${horsepower} HP ` + size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`}
                          </Text>
                          </TouchableOpacity>
                        )
                    }}
                    options={this.state.specs}
                    selectedOptions={[]}
                    renderSeparator={(option)=>{return (<View/>)}}
                    renderIndicator={(option)=>{return (<View/>)}}/>
                </ScrollView>
              )
    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title={"Specs"}
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          {content}
      </View>
    )
  }
}

export default connect (mapStateToProps) (SpecsList)
