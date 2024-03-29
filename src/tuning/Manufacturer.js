'use strict'
import React, {Component} from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import F8Button from '../common/F8Button'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {BuildsPagerByManufacturerId} from '../build'

import {General, Titles, DetailStyles, PostStyles, Specs, HEIGHT} from '../styles'
import {Heading3, Paragraph} from '../common/F8Text'

import {
	BackSquare,
	PartsByManufactuer,
	SpecSelector,
} from '../components'


export default class Manufacturer extends Component {
	constructor (props) {
		super (props)
	}

	render () {
		let {manufacturer, specId} = this.props
	      , foregroundContent = manufacturer?(
	        <View style={{flex: 1}}>
	          <View style={DetailStyles.userInfoContainer}>
	            <Image style={[PostStyles.manufacturerPhoto]} source={{uri: manufacturer.logo}}/>
	          </View>
	          <View style={{right: 8, position: 'absolute', bottom: 0}}>
				<F8Button 
    	          icon={require ('../common/img/car.png')}
                  onPress={()=>Actions.BuildsByManufacturerId({manufacturerId: manufacturer.manufacturerId})}
                  style={{flex: -1}}            
                  type="search" caption="See All Builds"/>
	          </View>
	        </View>
	      ):(<View/>)

		return (
	      <ParallaxScrollView
	        backgroundColor="transparent"
	        contentBackgroundColor="white"
	        backgroundSpeed={1}
	        parallaxHeaderHeight={HEIGHT}
	        stickyHeaderHeight={64}
	        renderForeground={()=>{return foregroundContent}}
	        renderBackground={() => <BuildsPagerByManufacturerId manufacturerId={manufacturer.manufacturerId}/>}
	        renderFixedHeader={()=>(<BackSquare/>)}
	        >
	        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>
	        <PartsByManufactuer specId={specId} manufacturerId={manufacturer.manufacturerId}/>
	        </View>
	      </ParallaxScrollView>
		)		
	}
}
	        // <SpecSelector style={{marginTop: 16, flex: 1}} manufacturerId={manufacturer.manufacturerId}/>

