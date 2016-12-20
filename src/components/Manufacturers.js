'use strict'
import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'

import {Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'
import {DetailStyles} from '../styles'
import {connect} from 'react-redux'
import {fetchManufacturersBySpecId} from '../reducers/tuning/filterActions'
import {manufacturersBySpecIdSelector, manufacturersPaginationBySpecIdSelector} from '../selectors'

import {LoadingView, ErrorView} from './'
const mapStateToProps = (state, props) => {
  return {
    manufacturers: manufacturersBySpecIdSelector (state, props),
    pagination: manufacturersPaginationBySpecIdSelector (state, props)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchManufacturers: () => {dispatch (fetchManufacturersBySpecId (props.specId))}
  }
}

class Manufacturers extends Component {
  constructor (props) {
    super (props)
  }

  componentWillMount() {
    this.props.fetchManufacturers()  
  }

  render() {
    let {manufacturers, onPress, specId, pagination} = this.props
    console.log (this.props)
    if (pagination.isFetching) return (<LoadingView/>)
    else if (pagination.hasError) return (<ErrorView/>)
    else if (!manufacturers.length) return (<View/>)
    return (
        <ScrollView
          style={{marginTop: 8, height: 150, flex: -1}}
          containerStyle={{height: 150}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
        {
          manufacturers.map ((data, cidx)=> {
            let {name, logo, manufacturerId} = data
              , passProps = Object.assign ({}, {manufacturerId}, {name}, {specId})
            return (
                <TouchableWithoutFeedback  onPress={()=>{
                  Actions.Manufacturer ({manufacturer: data, specId})
                }}>
                  <Image
                    source={{uri: logo}}
                    style={[DetailStyles.scrollImage, {resizeMode: 'contain'}]}>
                  </Image>
                </TouchableWithoutFeedback>
            )
          })
        }
    </ScrollView>)
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Manufacturers) 

