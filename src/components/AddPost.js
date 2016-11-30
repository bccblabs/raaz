'use strict'

import React, {Component} from 'react'
import {View, Image, Platform, Text, TextInput, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {PostStyles, NewPostStyles} from '../styles'
import { RNS3 } from 'react-native-aws3';
import {Bar} from 'react-native-progress'
import md5 from 'md5'
import {profileSelector} from '../selectors'
import {createPostAndFetch} from '../reducers/user/userActions'
import F8Button from '../common/F8Button'
import Video from 'react-native-video'
let imageOpts = {
  title: 'Choose Photo',
  mediaType: 'photo',
  quality: '0.7',
  maxHeight: 300,
  maxWidth: 300,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let videoOpts = {
	title: 'Choose Video',
	mediaType: 'video',
	takePhotoButtonTitle: 'Video Shoot',
	chooseFromLibraryButtonTitle: 'Video from Library',
	videoQuality: 'high',
	durationLimit: '300',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
}

let uploadOpts = {
  keyPrefix: "user-uploads/",
  bucket: "raaz-user-images",
  region: 'us-east-1',
  accessKey: "AKIAJC4RSF66ZHF6VKYQ",
  secretKey: "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",
  successActionStatus: 201
}


const mapStateToProps = (state, props) => {
	return {
	    profileData: profileSelector (state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		createNewPost: (data) => {dispatch (createPostAndFetch (props.postType, props.parentId, data))}
	}
}
class AddPost extends Component {
	constructor (props) {
	    super (props)
	    this.state = {
	      profileData: props.profileData,
	      type: '',
	      source: '',
	      text: '',
	      fileType: '',
	      fileName: '',
	      isUploading: false,
	      progress: '',
	      errMsg: '',
	    }
	    this.selectMedia = this.selectMedia.bind (this)
	    this.renderMedia = this.renderMedia.bind (this)
	    this.upload = this.upload.bind (this)
	}
	upload () {

		let {fileName, fileType, source,
			text, profileData} = this.state
			, file = {uri: source, name: fileName, type: fileType}
			, {createNewPost} = this.props
		RNS3.put(file, uploadOpts)
		.progress ((e)=>{this.setState ({isUploading: true, progress: e.loaded / e.total})})
		.then(response => {
			if (response.status !== 201) {
				this.setState ({errMsg: 'Upload Error, Try Again!'})
			}
			else {
				createNewPost ({media: response.location, text: text, userId: profileData.user_id})
				this.setState ({isUploading: false, text: '', fileType: '', fileName: '', progress: '', source: '', type: ''})
			}
		  });
	}
	renderMedia () {
		console.log (this.state)
		let {source, type} = this.state
			, content
		if (source && source.length) {
			if (type === 'photo') {
				content = (
					<Image source={{uri: source}} style={PostStyles.primaryImage}/>
				)
			}
			else if (type === 'video') {
				content = (
					<Video
					  repeat
					  resizeMode='cover'
					  source={{uri: source}}
					  style={styles.backgroundVideo}
					/>
				)
			}
		return (
			<View style={{marginVertical: 8}}>
			{content}
            <TouchableWithoutFeedback
              onPress={()=>{this.setState ({type: '', source: ''})}}>
              <View style={{position: 'absolute', right: 8, top: 16, backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <Image source={require ('../common/img/x-white.png')} style={{height:16, width: 16}}/>
              </View>
            </TouchableWithoutFeedback>
			</View>
		)
		} else {
			return (<View/>)
		}
	}

	selectMedia (opts) {
		ImagePicker.showImagePicker(opts, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else {
		  	console.log ('selectmedias')
		  	let source, fileType, fileName
		    if (Platform.OS === 'ios') {
		      source = response.uri.replace('file://', '')
		      fileType = response.uri.split ('.').slice (-1)[0]
		      fileName = md5(response.uri.split ('/').slice (-1)[0] + this.state.profileData.user_id) + '.' + fileType
		    } else {
		      source = response.uri
		      fileType = response.type
		      fileName = md5(response.fileName)
		    }
		    console.log (response)
		    this.setState({
		      source: source,
		      type: opts.mediaType,
		      fileType: fileType,
		      fileName: fileName,
		    });
		  }
		});		
	}
	render () {
	    let {profileData, placeholder} = this.props
	    	, {isUploading, progress} = this.state
	    	, content
	    if (isUploading) {
	    	content = (<Bar style={{marginTop: 8, marginBottom: 24}} height={24} width={300} progress={this.state.progress} color='red' />)
	    } 
	    else if (profileData.user_id === '') return content = (<View/>)
	    else {
	    	content = (
			<View style={{flex :1, margin: 8}}>
			{this.renderMedia()}
	      	<View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 8, flex: -1}}>
			<Image source={{uri: profileData.picture}} style={{height: 45, width: 45, marginVertical: 8}}/>
		        <F8Button 
		          icon={require ('../common/img/camera.png')} 
		          onPress={()=>{this.selectMedia(imageOpts)}} 
		          type="tertiary" 
		          caption="Photo" 
		          style={{flex: -1}}/>
		        <F8Button 
		          icon={require ('../common/img/video.png')} 
		          onPress={()=>{this.selectMedia(videoOpts)}} 
		          type="tertiary" 
		          caption="Video" 
		          style={{flex: -1}}/>
		        <F8Button 
		          icon={require ('../common/img/publish.png')} 
		          onPress={()=>this.upload()}
		          type="tertiary" 
		          caption="Publish" 
		          style={{flex: -1}}/>
			</View>
				<TextInput
					placeholder={placeholder?placeholder:"  OMG IT'S FAST"}
					multiline={true}
					maxLength={140}
					onChangeText={(text) => {
						this.setState({text});
					}}
					style={NewPostStyles.singleLineBlockInput}/>
			</View>
    		)
	    }
		return (
		<View style={{flex: -1, paddingHorizontal: 16, marginBottom: 4, borderBottomWidth: 0.5, borderBottomColor: '#f8e0f8'}}>
			{content}
		</View>		
		)
	}
}

export default connect (mapStateToProps) (AddPost)