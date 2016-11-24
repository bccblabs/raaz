'use strict'
import React, {Component} from 'react'
import {View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import F8Button from '../common/F8Button'

export default class SpecSelector extends Component {
	render () {
		let {manufacturerId} = this.props
		return (
		<View style={{flex: -1}}>
	        <F8Button style={{flex: 1}}  onPress={()=>Actions.SpecsByManufacturer({manufacturerId})}
	                  caption="search By car" type="search"
	                  icon={require ('../common/img/search.png')}/>
		</View>
		)
	}	
}
