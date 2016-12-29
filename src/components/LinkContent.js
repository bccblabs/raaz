'use strict'

import React, {Component} from 'react'
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Image,
	Text
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {PostStyles} from '../styles'


export default class LinkContent extends Component {
	render () {
		let {linkAction, name, image, removeAction} = this.props
		return (
            <View style={{flex: 1,marginHorizontal: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
				<TouchableWithoutFeedback onPress={linkAction}>
					<Image style={{width: 100, height: 100}} source={{uri: image}}/>
				</TouchableWithoutFeedback>
				<Text style={[PostStyles.primaryTitle]}>{name}</Text>
				{
				removeAction ? (
	            <TouchableOpacity
	            	style={{alignSelf: 'center', position: 'absolute', right: 8, top: 35}}
					onPress={removeAction}>
					<Image source={require ('../common/img/x.png')} style={{height:32, width: 32}}/>
	            </TouchableOpacity>
				) : null					
				}
            </View>
		)		
	}
}