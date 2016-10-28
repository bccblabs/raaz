'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import F8Button from '../common/F8Button'

export default class ErrorView extends Component {
  render () {
    let {onPress, caption} = this.props
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <F8Button type='error'
        caption={caption?caption:'No data loaded :('}
        onPress={onPress}
        icon={require ('../common/img/empty.png')}/>
      </View>
    )
  }
}
