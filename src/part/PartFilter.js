'use strict'
import React, {Component} from 'react'
import {
  TouchableOpacity,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {CategoryFilter} from '../components'

import {togglePartTag} from '../reducers/tuning/filterActions'

export default class PartFilter extends Component {
  render () {
    const leftItem = {icon: require ('../common/img/back.ios.png'), onPress: ()=>{Actions.pop()}}
        , {filterId, title} = this.props
    return (
      <View style={{flex: 1}}>
      <F8Header title={title.toUpperCase()} foreground='dark' leftItem={leftItem} />
      <F8Button onPress={Actions.SearchTuning}
                caption="search" type="search"
                icon={require ('../common/img/search.png')}/>
      <CategoryFilter filterId={filterId} title={title} toggleAction={togglePartTag}/>
      </View>
    )
  }
}
