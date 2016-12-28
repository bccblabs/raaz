'use strict'

import React, {Component} from 'react'
import {
	TouchableWithoutFeedback,
	View,
	Image,
	Text
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {PostStyles} from '../styles'


export default class LinkContent extends Component {
	render () {
		let {linkAction, name, image} = this.props

		return (
          <TouchableWithoutFeedback onPress={linkAction}>
            <View style={{flex: -1,  marginLeft: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
              <Image style={{width: 100, height: 100}} source={{uri: image}}/>
              <Text style={[PostStyles.primaryTitle]}>{name}</Text>
            </View>
          </TouchableWithoutFeedback>
		)		
	}
}