'use strict'
import React, {Component} from 'react'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {Heading3, Paragraph} from '../common/F8Text'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import {Cell, Section, TableView} from 'react-native-tableview-simple'
import {FilterStyles, NewPostStyles} from '../styles'

class NewListing extends Component {
	render () {
		return (
		<View>
	        <F8Header
	          foreground='dark'
	          title="Listing"
	          leftItem={{ title: "Back", onPress:()=>{Actions.pop()}}}
	          style={FilterStyles.headerStyle}/>
				<TableView style={{alignSelf: 'stretch', backgroundColor: 'white'}}>
					<Section header="Listing">
						<Cell cellStyle="RightDetail" accessory="DisclosureIndicator" title="Price" />
						<Cell cellStyle="RightDetail" accessory="DisclosureIndicator" title="Mileage" />
						<Cell cellStyle="RightDetail" accessory="DisclosureIndicator" title="Serial Number/VIN" />
					</Section>
					<Section header="Contact Info">
						<Cell cellStyle="leftDetail" accessory="DisclosureIndicator" title="Name" />
						<Cell cellStyle="leftDetail" accessory="DisclosureIndicator" title="Email" />
						<Cell cellStyle="leftDetail" accessory="DisclosureIndicator" title="Contact Phone" />
					</Section>
	              <TextInput
	                placeholder="OMG IT'S FAST"
	                multiline={true}
	                style={NewPostStyles.largeBlockInput}/>
				</TableView>
		</View>
		)

	}
}

export default connect () (NewListing)