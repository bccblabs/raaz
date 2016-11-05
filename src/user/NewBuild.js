'use strict'

import React, {Component} from 'react'
import {
	Image,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import ImagePicker from 'react-native-image-crop-picker'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import keys from 'lodash/keys'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

import Part from '../part/Part'
import {Heading3, Paragraph} from '../common/F8Text'

import {Titles, General, PartStyles, DetailStyles, NewPostStyles, Styles} from '../styles'
import {LoadingView, ErrorView, MetricsGraph} from '../components'

import {
	newBuildSelector,
	userIdSelector,
} from '../selectors'

import {
	addBuildMedia, 
	removeBuildMedia, 
	setBuildImage,
	setBuildName,
	addBuildSpecEntry,
	editBuildSpecEntry,
	removeBuildSpecEntry,
	removePart,
	createBuild, 
} from '../reducers/build/buildActions'

const mapStateToProps = (state) => {
	return {
		build: newBuildSelector (state),
		userId: userIdSelector (state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addBuildMedia: (mediaList) => dispatch (addBuildMedia (mediaList)),
		removeBuildMedia: (path) => dispatch (removeBuildMedia (path)),
		setBuildImage: (path) => dispatch (setBuildImage (path)),
		setBuildName: (name) => dispatch (setBuildName(name)),

		addBuildSpecEntry: (name, value) => dispatch (addBuildSpecEntry (name, value)),
		editBuildSpecEntry: (name, value) => dispatch (editBuildSpecEntry (name, value)),
		removeBuildSpecEntry: (name) => dispatch (removeBuildSpecEntry (name)),

		removePart: (partId) => dispatch (removePart (partId)),
		createBuild: () => dispatch (createBuild())
	}
}

class NewBuild extends Component {

	constructor (props) {
		super (props)
		this.state = {build: props.build}
		this.pickMedia = this.pickMedia.bind (this)
		this.takePhoto = this.takePhoto.bind (this)
		this.renderImages = this.renderImages.bind (this)
	}

	pickMedia () {
		ImagePicker.openPicker({
		  width: 300,
		  height: 400,
		  cropping: true,
		  multiple: true
		}).then(images => {
		  let photos = images.map ((image)=>image['path'])
		  this.props.addBuildMedia (photos)
		});
	}

	takePhoto () {
		ImagePicker.openCamera({
		  width: 300,
		  height: 400,
		  cropping: true
		}).then(image => {
		  let path = image['path'];
		  this.props.addBuildMedia ([path])
		});    
	}

	renderImages () {
		let {buildMedia} = this.state.build
		return buildMedia.length>0?
		  ( 
			<ScrollView
				horizontal={true}
				showsVerticalScrollIndicator={false}
				style={{margin: 8}}
				showsHorizontalScrollIndicator={false}>
				{
				  buildMedia.map ((img, idx)=>{
				    return (
				    <View key={idx} style={{marginLeft: 4}}>
				    <TouchableWithoutFeedback
				      onPress={()=>{this.props.removeBuildMedia (img)}}>
				      <Image source={require ('../common/img/x.png')} style={{height:16, width: 16,alignSelf: 'flex-end'}}/>
				    </TouchableWithoutFeedback>
				    <Image style={{width: 100, height: 100, marginHorizontal: 8}} source={{uri: img}}/>
				    </View>
				    )
				})
			}
			</ScrollView>
		  )
		  :(<View/>)
	}

	render() {
		console.log ('state', this.state, 'props', this.props)
		let {
			addBuildMedia,
			removeBuildMedia,
			setBuildImage,
			setBuildName,

			addBuildSpecEntry,
			editBuildSpecEntry,
			removeBuildSpecEntry,

			removePart,
			createBuild,

			userId,
		} = this.props

		, {
			buildName,
			buildMedia,
			buildParts,
			buildSpecs,
		} = this.state

		, leftItem = {
			icon: require ('../common/img/back.ios.png'),
			onPress: Actions.pop
		}			
		,	rightItem = {
			icon: require ('../common/img/publish.png'),
			onPress: ()=>Actions.BuildsByUserId({userId})
		}
		,	header = (<F8Header foreground="dark" leftItem={leftItem} rightItem={rightItem} title="New Build"/>)

		,	mainImage = (buildMedia && buildMedia[0].length)?{uri: buildMedia[0]}:require ('../common/img/2jz.png')
		,	foregroundContent
		,	specsContent
		,	partsContent
		,	images = this.renderImages ()

		return (
		<View style={{flex: 1}}>
        <ParallaxScrollView
          backgroundColor="transparent"
          contentBackgroundColor="white"
          backgroundSpeed={1}
          parallaxHeaderHeight={300+64}
          fixedHeaderHeight={64}
          renderFixedHeader={()=>header}
          renderForeground={()=>{return foregroundContent}}
          renderBackground={() => <Image source={mainImage} style={DetailStyles.VRImageHolder}/>}
          >
	        <View style={{margin:8, alignItems: 'center'}}>
	        	{images}
			    <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
				    <F8Button 
				    	icon={require ('../common/img/photo.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			onPress={this.pickMedia} 
		    			caption="Library"/>
				    <F8Button 
				    	icon={require ('../common/img/camera.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			onPress={this.takePhoto} 
		    			caption="Camera"/>
		    		</View>
				<TextInput
			        placeholder="OMG IT'S FAST"
			        multiline={true}
			        maxLength={140}
			        style={NewPostStyles.largeBlockInput}/>
				<Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>          
				{specsContent}
			    <View style={{alignItems: 'flex-start', flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
				    <F8Button 
				    	icon={require ('../common/img/car.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			caption="Pick Car"/>
				    <F8Button 
				    	icon={require ('../common/img/specs.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			onPress={this.takePhoto} 
		    			caption="Add Specs Entry"/>
	    		</View>
				<Paragraph style={Titles.filterSectionTitle}>{"PARTS"}</Paragraph>          
				{partsContent}
			    <View style={{alignItems: 'flex-start', flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
				    <F8Button 
				    	icon={require ('../common/img/tuning.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			caption="Custom Parts"/>
				    <F8Button 
				    	icon={require ('../common/img/search.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			caption="Search"/>
	    		</View>
			</View>
		</ParallaxScrollView>
		</View>
		)

	}
}

export default connect (mapStateToProps, mapDispatchToProps) (NewBuild)
