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
            <View style={{flex: 1,marginHorizontal: 8, marginVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            	<View>
				<TouchableWithoutFeedback onPress={linkAction}>
					<Image style={{width: 96, height: 96, margin: 8}} source={{uri: image}}/>
				</TouchableWithoutFeedback>
				{
				removeAction ? (
	            <TouchableOpacity
	            	style={{alignSelf: 'center', position: 'absolute', left: 0, top: 0}}
					onPress={removeAction}>
					<Image source={require ('../common/img/x.png')} style={{height:20, width: 20}}/>
	            </TouchableOpacity>
				) : null					
				}
				</View>
				<Text style={[PostStyles.primaryTitle]}>{name}</Text>
            </View>
		)		
	}
}