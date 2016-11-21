'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import F8Button from '../common/F8Button'

export default class ErrorView extends Component {
  render () {
    let {onPress, caption} = this.props
    return (
      <View style={{flex: 1}}>
      <F8Button type='error'
        caption={caption?caption:'No data loaded :('}
        onPress={onPress}/>
      </View>
    )
  }
}
