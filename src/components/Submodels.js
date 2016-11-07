'use strict'

import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text
} from 'react-native'

import { FilterStyles } from '../styles'

import keys from 'lodash/keys'

import F8Header from '../common/F8Header'
import { LoadingView, ErrorView } from '../components'
import MultipleChoice from 'react-native-multiple-choice'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchSpecs } from '../reducers/car/filterActions'


const mapStateToProps = (state) => {
  return {
    submodels: keys(state.entities.submodels).sort(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (make, model, submodel) => {
      dispatch (fetchSpecs (make, model, submodel))
    },
  }
}

class SubmodelsList extends Component {
  constructor (props) {
    super (props)
    this.state = {
      submodels: props.submodels,
      selectedMake: props.selectedMake,
      selectedModel: props.selectedModel,
      isFetching: true,
    }
  }

  componentWillMount () {
    let {submodels, selectedMake, selectedModel} = this.props
    this.setState ({submodels, selectedMake, selectedModel, isFetching: true})
  }


  componentWillReceiveProps (nextProps) {
    let {submodels, selectedMake, selectedModel} = nextProps,
        isFetching = submodels.length?false:true
    this.setState ({submodels, selectedModel, selectedMake, isFetching})
  }

  render () {
    let {submodels, selectedMake, selectedModel, isFetching} = this.state,
        {fetchSpecs, onSelectSubModel} = this.props

    const leftItem = {
            icon: require ('../common/img/back.ios.png'),
            onPress: ()=>Actions.pop()
          },
          content = isFetching?(<LoadingView/>):(
            <ScrollView style={FilterStyles.optionsContainer}>
              <MultipleChoice
                maxSelectedOptions={1}
                renderText={(option)=> {return (<Text style={FilterStyles.multipleChoiceText}>{option.toUpperCase()}</Text>)}}
                options={this.state.submodels}
                renderSeparator={(option)=>{return (<View/>)}}
                renderIndicator={(option)=>{return (<View/>)}}
                onSelection={(option)=>{
                  fetchSpecs (selectedMake, selectedModel, option)
                  onSelectSubModel (option)
                }}/>
            </ScrollView>
          )

    return (
      <View style={FilterStyles.container}>
        <F8Header
          foreground="dark"
          title={this.state.selectedModel.toUpperCase()}
          leftItem={leftItem}
          style={FilterStyles.headerStyle}/>
          {content}
      </View>
    )
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (SubmodelsList)
