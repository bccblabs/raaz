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
import {Bar} from 'react-native-progress'

import ImagePicker from 'react-native-image-crop-picker'
import Video from 'react-native-video'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {keys, isEqual} from 'lodash'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

import Part from '../part/Part'
import {Heading3, Paragraph} from '../common/F8Text'

import {Requests} from '../utils'
import {Titles, General, PartStyles, DetailStyles, NewPostStyles, Styles, PostStyles, Specs, WIDTH} from '../styles'
import {LinkContent, LoadingView, ErrorView, MetricsGraph, BackSquare} from '../components'
import {unlinkBuild, removeBuild, uploadToS3} from '../reducers/newpost/newpostActions'

import {
	newBuildSelector,
	profileSelector,
	linkedBuilds, 
	linkedParts, 
	userIdSelector,
	buildSpecs
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
	setBuildSpecs,
} from '../reducers/build/buildActions'

const mapStateToProps = (state) => {
	return {
		// build: newBuildSelector (state),
		userId: userIdSelector (state),
		linkedBuilds: linkedBuilds (state),
		linkedParts: linkedParts (state),
	    profileData: profileSelector (state),
	    buildSpecs: buildSpecs (state),
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

		setBuildSpecs: (specs) => dispatch (setBuildSpecs (specs)),
		createBuild: () => dispatch (createBuild()),

		unlinkBuild: (buildId) => dispatch (removeBuild (buildId)),
		unlinkPart: (partId) => dispatch (removePart (partId)),

		uploadToS3: (file, postData) => dispatch (uploadToS3 (file, postData))
	}
}

class NewBuild extends Component {

	constructor (props) {
		super (props)
		console.log (props)
		this.state = {
			buildId: '', 
			// build: props.build, 
			buildSpecs: props.buildSpecs, 
			linkedParts: props.linkedParts, 
			linkedBuilds: props.linkedBuilds, 
			newBuild: {
				media: {
					source: props.source, 
					type: props.fileType
				},
				name: '',
			},
			filePath: props.source,
			fileType: props.fileType,
			fileName: props.fileName,
			text: props.text,
			isUploading: false,
			progress: 0,
		}
		this.renderSpecs = this.renderSpecs.bind (this)
		this.renderLinkedBuilds = this.renderLinkedBuilds.bind (this)
		this.renderLinkedParts = this.renderLinkedParts.bind (this)
		this.renderNewBuild = this.renderNewBuild.bind (this)
	    this.fetchBuildDetails = this.fetchBuildDetails.bind (this)
	    this.renderPostContent = this.renderPostContent.bind (this)
	    this.uploadPost = this.uploadPost.bind (this)
	}

	renderPostContent () {
	let {filePath, fileType, text} = this.state
	  , content

	if (filePath && filePath.length) {
	  if (fileType === 'photo') {
	    content = (
	      <Image source={{uri: filePath}} style={PostStyles.primaryImage}/>
	    )
	  }
	  else if (fileType === 'video') {
	    content = (
	      <Video
	        repeat
	        resizeMode='cover'
	        source={{uri: filePath}}
	        style={PostStyles.primaryImage}
	      />
	    )
	  }
	}
	return (
          <View style={{flexDirection: 'column', flex: -1}}>
			<Image source={{uri: this.props.profileData.picture}} style={{height: 56, width: 56, margin: 8}}/>
          	{content}
			<Paragraph style={{margin: 8}}>{text}</Paragraph>
		</View>
	)
	}

	renderNewBuild () {
		let {userId} = this.props
		return (
            <View style={{flex: -1,  marginLeft: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
				<Image style={{width: 100, height: 100}} source={{uri: this.state.newBuild.media.source}}/>
				<View style={{flexDirection: 'column', flex: 1, marginHorizontal: 8}}>
				<TextInput
	                onChangeText={(text) => {
	                	let newBuild = Object.assign (this.state.newBuild, {name: text})
						this.setState({newBuild})
	                }}
					placeholder="Give your ride a name"
					multiline={false}
					style={{flex: 1}}/>
				<View style={{flexDirection: 'row', flex: 1, alignSelf: 'flex-start' ,justifyContent: 'space-around'}}>	
			    <F8Button 
			    	icon={require ('../common/img/tuning.png')} 
			    	onPress={()=>Actions.Makes({build: true})}
	    			type="carTag" 
	    			style={{flex: -1}} 
	    			caption="Create New Build"/>
			    <F8Button 
			    	icon={require ('../common/img/car.png')} 
			    	onPress={()=>Actions.BuildsByUserId({userId, selector: true})}
	    			type="carTag" 
	    			style={{flex: -1}} 
	    			caption="Choose From My Builds"/>
	    		</View>
				</View>
            </View>

		)
	}

	componentWillReceiveProps(nextProps) {
		console.log ({nextProps, props: this.props})
		let {linkedBuilds, buildSpecs, linkedParts} = nextProps
			, buildId = ''

		if (linkedBuilds.length && linkedBuilds[0] && linkedBuilds[0].buildId !== this.state.buildId) {
			this.fetchBuildDetails (linkedBuilds[0].buildId)
			buildId = linkedBuilds[0].buildId
			this.setState ({buildId, build: nextProps.build, linkedParts, linkedBuilds: nextProps.linkedBuilds, buildSpecs: buildSpecs || {}})

		} else {
			this.setState ({buildId: '', build: nextProps.build, linkedParts, linkedBuilds: nextProps.linkedBuilds, buildSpecs: buildSpecs || {}})
		}
	}

	async fetchBuildDetails (buildId) {
		try {
		    let data = await Requests.fetchBuildDetails (buildId)
			this.setState ({
				hasError: false,
				isLoading: false,
			})
			data && data.specs && this.props.setBuildSpecs (data.specs) && data.specs.specId && this.setState ({specId: data.specs.specId})

	    } catch (err) {
	      this.setState ({hasError: true, isLoading: false})
	    }
	}

	renderSpecs () {
		let {buildSpecs} = this.state

		if (keys(buildSpecs).length) {
	        let {
	            cylinders, compressor, configuration,
	            transmissionSpeed, transmission, drivenWheels, size,
	          } = buildSpecs
			, dataArray = keys (buildSpecs).filter((key)=>Number.isInteger (buildSpecs[key]))
											.map ((key)=>{return {name: key, value: buildSpecs[key]}})
	        return (
	        	<View style={{alignItems: 'center', justifyContent: 'center'}}>
					<Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>          
					<View style={{marginHorizontal: 16}}>
						{size && cylinders && compressor?(<Heading3 style={Specs.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`.toUpperCase()}</Heading3>):(<View/>)}
						{drivenWheels?(<Heading3 style={Specs.subtitle}>{`${drivenWheels}`.toUpperCase()}</Heading3>):(<View/>)}
						<MetricsGraph onDoneEdit={this.props.editBuildSpecEntry} editable={true} data={[{entries:dataArray}]}/>
					</View>
				</View>
	          )
		}
		else return (<View/>)
	}
	
	renderLinkedBuilds () {
		let {linkedBuilds} = this.state
		console.log (linkedBuilds)
		return (
			<View>
			{linkedBuilds.map ((build, idx)=>(<LinkContent removeAction={()=>this.props.unlinkBuild (build.buildId)} key={idx} name={build.name} image={build.image} />))}
			</View>
		)
	}


	renderLinkedParts () {
		let {linkedParts} = this.state
		console.log (linkedParts)
		return (linkedParts && linkedParts.length > 0)?(
			<View>
			<Paragraph style={Titles.filterSectionTitle}>{"PART"}</Paragraph>          
			{linkedParts.map ((part, idx)=>(<LinkContent removeAction={()=>this.props.unlinkPart (part.partId)} key={idx} name={part.name} image={part.media} />))}
			</View>
		):(<View/>)
	}

	render() {
		console.log (this.state)
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
			buildSpecs,
		} = this.state
		, { specId } = this.state
		, leftItem = {
			title: 'Back',
			onPress: ()=>Actions.pop()
		}			
		, rightItem = (buildSpecs.specId)?{title: 'Tag Part',onPress: ()=>{Actions.Manufacturers ({specId: buildSpecs.specId})}}:{}
		, specsContent = this.renderSpecs()
		, partLink = this.renderLinkedParts()
		, buildLink = this.state.linkedBuilds.length ? (this.renderLinkedBuilds()) : (this.renderNewBuild())

		console.log (this.state)
		return (
	        <View style={{flex: 1}}>
			<F8Header style={General.Header} foreground="dark" leftItem={leftItem} title="Build Info" rightItem={rightItem}/>
			<ScrollView style={{marginBottom: 50}}>
		        {this.renderPostContent()}
				<Paragraph style={Titles.filterSectionTitle}>{"CAR"}</Paragraph>          
				{buildLink}
			    <View style={{alignItems: 'flex-start', flex: 1, flexDirection: 'column', marginVertical: 16}}>
				{specsContent}
	    		{partLink}
	    		</View>
			</ScrollView>
	        <F8Button
	          style={[General.bottomButtonStyle, {position: 'absolute', bottom: 0}]}
	          type="saved" caption="POST!"
	          onPress={()=>{
	          	this.uploadPost ()
	          	Actions.popTo("main")
	          }}
	        />
		</View>
		)
	}

	uploadPost () {
		let {linkedBuilds, linkedParts, newBuild, text, fileName, filePath, fileType, buildSpecs} = this.state
			, partIds = linkedParts.map ((part)=>part.partId)
			, buildId = linkedBuilds[0] && linkedBuilds[0].buildId || ''
		try {
			let data = {
				buildSpecs,
				buildId,
				partIds,
				text,
			}, file = {
				uri: filePath,
				name: fileName,
				type: fileType,
			}

			data = (buildId === '') ? Object.assign (data, {newBuild}) : data
			this.props.uploadToS3 (file, data)
		} catch (err) {

		}
	}

}

export default connect (mapStateToProps, mapDispatchToProps) (NewBuild)
