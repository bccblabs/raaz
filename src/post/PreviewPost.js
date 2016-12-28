'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {Titles, General} from '../styles'

export default class PreviewBuild extends Component {
	constructor (props) {
		super (props)
		this.renderVideosContainer = this.renderVideosContainer.bind (this)
		this.renderImagesContainer = this.renderImagesContainer.bind (this)
	}

	renderVideosContainer () {
		return this.state.videos.length>0?
		( <View>
	          <Heading3 style={Titles.buildSectionTitle}>{"Video"}</Heading3>
			<ScrollView
				horizontal={true}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}>
				{
				  this.state.videos.map ((img, idx)=>{
				    return (
				      <View key={idx} style={{alignItems: 'center', height: 300, width: 300}}>
				        <Video
				           source={{uri: img.uri}}/>
				        <F8Button
				          onPress={()=>{
				            let images = this.state.videos.splice (idx, 1)
				            this.setState ({videos: this.state.videos})
				            }}
				          type='saved'
				          caption="Remove"/>
			        </View>
				    )
				  })
				}
			</ScrollView>
		</View>
		)
		:(<View/>)
	}
	renderImagesContainer () {
	return this.state.images.length>0?
		( 
			<View>
	          <Heading3 style={Titles.buildSectionTitle}>{"Photos"}</Heading3>
				<ScrollView
					horizontal={true}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					{
					  this.state.images.map ((img, idx)=>{
				    	return (
							<View key={idx} style={{alignItems: 'center'}}>
							<Image style={{width: 100, height: 100}} source={{uri: img.uri}}/>
							<F8Button
							  	type='saved'
							    onPress={()=>{
							      let images = this.state.images.splice (idx, 1)
							      this.setState ({images: this.state.images})
							      }}
							    type='secondary'
							    caption="Remove"/>
							</View>
				    	)
				  })
				}
				</ScrollView>
			</View>
		)
		:(<View/>)
	}

	render () {
		return (<View/>)
	}
}