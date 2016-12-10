'use strict'

import React, {Component} from 'react'
import {TouchableWithoutFeedback, View} from 'react-native'
import keys from 'lodash/keys'
import {Actions} from 'react-native-router-flux'

import {Heading3} from '../common/F8Text'
import {MetricsGraph} from './'

import {DetailStyles, Specs, Titles} from '../styles'


export default class SpecsView extends Component {
	render () {
		if (!this.props.specs) return (<View/>)

		let {specs} = this.props, 
			{
	            cylinders, compressor, configuration,
	            drivenWheels, size, specId,
	         } = specs
		const dataArray = keys(specs).filter(k=>{return !isNaN(parseFloat(specs[k])) && isFinite(specs[k])})
									.map ((key)=>{return {name: key, value: specs[key]}})

		return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
			<View>
				<Heading3 style={Titles.filterSectionTitle}>{"SPECS"}</Heading3>
				<View style={{alignItems: 'center'}}>
					<Heading3 style={Specs.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`.toUpperCase()}</Heading3>
					<Heading3 style={Specs.subtitle}>{`${drivenWheels}`.toUpperCase()}</Heading3>
					<MetricsGraph data={[{entries:dataArray}]}/>
				</View>
	        </View>
	        </TouchableWithoutFeedback>
		)
	}
}