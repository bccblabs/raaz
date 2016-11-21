'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import F8Button from '../common/F8Button'

export default class ErrorView extends Component {
  render () {
    let {onPress, errMsg} = this.props
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
      <F8Button type='error' caption={'Error happened, try loading again!'} onPress={onPress}/>
      </View>
    )
  }
}
