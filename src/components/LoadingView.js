'use strict'
import React, {Component} from 'react'
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

var Spinner = require('react-native-spinkit')
const window = Dimensions.get('window')
import {Actions} from 'react-native-router-flux'

export default class LoadingView extends Component {
  render () {
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
        <Spinner style={{}} isVisible={true} size={100} type={'Wave'} color={'#CC0000'}/>
      </View>
    )
  }
}
