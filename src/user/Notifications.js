'use strict'
import React, {Component} from 'react'
import {View} from 'react-native'

import F8Header from '../common/F8Header'
export default class Notifications extends Component {
  render () {
    return (<View><F8Header foreground="dark" title="Messages"/></View>)
  }
}
