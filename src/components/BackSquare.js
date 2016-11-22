import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Image} from 'react-native'
import {Actions} from 'react-native-router-flux'
export default class BackSquare extends Component {
	render () {
		return (
            <View style={{backgroundColor: 'rgba(0,0,0,0.2)', position: 'absolute', top: 24, left: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <TouchableWithoutFeedback onPress={Actions.pop}>
              <Image source={require ('../common/img/back_white.ios.png')} style={{flex: -1}}/>
              </TouchableWithoutFeedback>
            </View>
		)
	}
}
