'use strict'

import React, {Component} from 'react'
import F8Button from '../common/F8Button'
import ImagePicker from 'react-native-image-picker'

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
	durationLimit: '30',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
}

export default class NewPostButton extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
			type: '',
			source: '',
			text: '',
			fileType: '',
			fileName: '',
			isUploading: false,
			hasAttachments: false,
			progress: '',
			hasError: false,
	  };
	  this._selectMedia = this._selectMedia.bind (this)
	}

	_selectMedia (opts) {
		ImagePicker.showImagePicker(opts, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		  	this.setState ({hasError: true})
		  }
		  else {
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
		    this.setState({
		    	hasAttachments: true,
				source: source,
				type: opts.mediaType,
				fileType: fileType,
				fileName: fileName,
		    });
		  }
		});			
	}

	render () {
		return (
	        <F8Button style={{flex: 1}}
	                  onPress={()=>this._selectMedia(videoOpts)}
	                  type="search"
	                  icon={require ('../common/img/camera.png')}
	                  caption={"New Post"}/>
		)
	}
}