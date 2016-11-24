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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {BuildsPagerByManufacturerId} from '../build'

import {General, Titles, DetailStyles, PostStyles, Specs} from '../styles'
import {Heading3, Paragraph} from '../common/F8Text'

import {
	BackSquare,
	PartsByManufactuer
} from '../components'


export default class Manufacturer extends Component {
	render () {
		let {specId, manufacturer} = this.props
	      , foregroundContent = manufacturer?(
	        <View style={{flex: 1}}>
	          <View style={DetailStyles.userInfoContainer}>
	            <Image style={PostStyles.largeUserPhoto} source={{uri: manufacturer.logo}}/>
	            <Text style={[DetailStyles.lightTitle, {backgroundColor: 'rgba(0,0,0,0.6)'}]}>{manufacturer.name}</Text>
	          </View>
	          <View style={{right: 8, position: 'absolute', bottom: 0}}>
				<F8Button 
					icon={require ('../common/img/comment.png')}
					style={{flex: -1}}            
					type="search" caption="Follow"/>
	          </View>
	        </View>
	      ):(<View/>)

		return (
	      <ParallaxScrollView
	        backgroundColor="transparent"
	        contentBackgroundColor="white"
	        backgroundSpeed={1}
	        parallaxHeaderHeight={300}
	        stickyHeaderHeight={64}
	        renderForeground={()=>{return foregroundContent}}
	        renderBackground={() => <Image source={require ('../common/img/r34.png')} style={DetailStyles.VRImageHolder}/>}
	        renderFixedHeader={()=>(<BackSquare/>)}
	        >
	        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>
	        <BuildsPagerByManufacturerId style={{flex: 1}} manufacturerId={manufacturer.manufacturerId}/>
	        <PartsByManufactuer specId={specId} manufacturerId={manufacturer.manufacturerId}/>
	        </View>
	      </ParallaxScrollView>
		)		
	}
}