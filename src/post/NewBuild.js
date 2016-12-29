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
import {keys, isEqual} from 'lodash'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

import Part from '../part/Part'
import {Heading3, Paragraph} from '../common/F8Text'

import {linkedBuilds} from '../selectors'
import {Requests} from '../utils'
import {Titles, General, PartStyles, DetailStyles, NewPostStyles, Styles, PostStyles, Specs, WIDTH} from '../styles'
import {LinkContent, LoadingView, ErrorView, MetricsGraph, BackSquare} from '../components'
import {unlinkBuild} from '../reducers/newpost/newpostActions'
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
	setBuildSpecs,
} from '../reducers/build/buildActions'

const mapStateToProps = (state) => {
	return {
		build: newBuildSelector (state),
		userId: userIdSelector (state),
		linkedBuilds: linkedBuilds (state),
		specs: {},
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
		removePart: (partId) => dispatch (removePart (partId)),
		createBuild: () => dispatch (createBuild()),

		unlinkBuild: (buildId) => dispatch (unlinkBuild (buildId))
	}
}

class NewBuild extends Component {

	constructor (props) {
		super (props)
		this.state = {buildId: '', build: props.build, buildSpecs: {}, linkedBuilds: props.linkedBuilds, newBuild: {media: {source: props.source, type: props.type}}}
		this.renderSpecs = this.renderSpecs.bind (this)
		this.renderLinkedBuilds = this.renderLinkedBuilds.bind (this)
		this.renderNewBuild = this.renderNewBuild.bind (this)
	    this.fetchBuildDetails = this.fetchBuildDetails.bind (this)
		console.log ('state:', this.state)
	}

	renderNewBuild () {
		return (
            <View style={{flex: -1,  marginLeft: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
				<Image style={{width: 100, height: 100}} source={{uri: this.state.newBuild.media.source}}/>
				<TextInput
					placeholder="Give your ride a name"
					multiline={false}
					style={{flex: 1, marginHorizontal: 16}}/>
            </View>

		)
	}
	componentWillReceiveProps(nextProps) {
		console.log ({nextProps, props: this.props})
		let {linkedBuilds, buildSpecs} = nextProps
			, buildId = ''
			, specs = nextProps.build && nextProps.build.buildSpecs || {}

		if (linkedBuilds.length && linkedBuilds[0] && linkedBuilds[0].buildId !== this.state.buildId) {
			this.fetchBuildDetails (linkedBuilds[0].buildId)
			buildId = linkedBuilds[0].buildId
			this.setState ({buildId, build: nextProps.build, linkedBuilds: nextProps.linkedBuilds, buildSpecs: specs})
		} else {
			this.setState ({build: nextProps.build, linkedBuilds: nextProps.linkedBuilds, buildSpecs: specs})
		}
	}

	  async fetchBuildDetails (buildId) {
	    try {
	        let data = await Requests.fetchBuildDetails (buildId)
			this.setState ({
				hasError: false,
				isLoading: false,
			})

			data && data.specs && this.props.setBuildSpecs (data.specs)
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
		          <View style={[DetailStyles.descriptionContainer, {alignItems: 'flex-start', margin: 16}]}>
		        	  {size && cylinders && compressor?(<Heading3 style={Specs.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`.toUpperCase()}</Heading3>):(<View/>)}
			          {drivenWheels?(<Heading3 style={Specs.subtitle}>{`${drivenWheels}`.toUpperCase()}</Heading3>):(<View/>)}
		        	  <MetricsGraph onDoneEdit={this.props.editBuildSpecEntry} editable={true} data={[{entries:dataArray}]}/>
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
	render() {
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
		} = this.state.build

		, leftItem = {
			title: 'Back',
			onPress: Actions.pop
		}			
		, rightItem = {
			title: 'Tag Part',
			onPress: Actions.PreviewPost
		}
		, specsContent = this.renderSpecs()
		, buildLink = this.state.linkedBuilds.length ? (this.renderLinkedBuilds()) : (this.renderNewBuild())
		, linkActionButton = this.state.linkedBuilds.length? null : (
				    <F8Button 
				    	icon={require ('../common/img/car.png')} 
				    	onPress={()=>Actions.BuildsByUserId({userId, selector: true})}
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			caption="... Or Choose From My Builds"/>
		)

		console.log('state', this.state)
		return (
	        <View style={{flex: 1}}>
			<F8Header style={General.Header} foreground="dark" leftItem={leftItem} title="Build Info" rightItem={rightItem}/>
				<Paragraph style={Titles.filterSectionTitle}>{"CAR"}</Paragraph>          
					{buildLink}
					{linkActionButton}
				<Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>          
			    <View style={{alignItems: 'flex-start', flex: 1, flexDirection: 'column'}}>
					{specsContent}
					<View style={{flexDirection: 'row', marginVertical: 4, alignItems: 'stretch', alignSelf: 'center'}}>
					{
					this.state.linkedBuilds.length ? null : (
				    <F8Button 
				    	icon={require ('../common/img/car.png')} 
				    	onPress={()=>Actions.Makes({build: true})}
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			caption="Pick Car"/>
					)						
					}
				    <F8Button 
				    	icon={require ('../common/img/specs.png')} 
		    			type="tertiary" 
		    			style={{flex: -1}} 
		    			onPress={()=>Actions.EditSpecs ({onDoneEdit: this.props.addBuildSpecEntry, newEntry: true})} 
		    			caption="Add Specs Entry"/>
	    		</View>
	    		</View>
			</View>
		)

	}
}

export default connect (mapStateToProps, mapDispatchToProps) (NewBuild)
