import React, {Component} from 'react'
import {Platform} from 'react-native'
import {Actions} from 'react-native-router-flux'

import F8Button from '../common/F8Button'

import ImagePicker from 'react-native-image-picker'
import md5 from 'md5'


export default class SelectMediaButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opts: props.opts,
			userId: props.userId
		}
		console.log (this.state.opts)
		this.selectMedia = this.selectMedia.bind (this)
	}

	selectMedia () {
		let opts = this.state.opts
		ImagePicker.showImagePicker(opts, (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		  	throw new Error (response.error)
		  }
		  else {
		    let source, fileType = opts.mediaType, fileName
		    if (Platform.OS === 'ios') {
		      source = response.uri.replace('file://', '')
		      ext = response.uri.split ('.').slice (-1)[0]
		      fileName = md5(response.uri.split ('/').slice (-1)[0] + this.state.userId) + '.' + ext
		    } else {
		      source = response.uri
		      ext = response.type
		      fileName = md5(response.fileName)
		    }
			  Actions.NewBuild ({source, ext, fileName, fileType})
		  }
		})
	}	

  render () {
  	return (
		<F8Button style={{flex: 1}}
		    onPress={this.selectMedia}
		    type="icon"
		    icon={this.props.icon}
		    caption={"New Post"}/>
	)
  }
}
 