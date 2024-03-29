'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  View,
  Platform,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import Video from 'react-native-video'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {Actions} from 'react-native-router-flux'

import ImagePicker from 'react-native-image-picker'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading3} from '../common/F8Text'

import {FilterCard} from '../components'

import {NewPostStyles, General, PostStyles, Titles} from '../styles'
import {ImageOptions, VideoOptions} from '../constants'

import {profileSelector, selectedMediaSelector} from '../selectors'
import {removeFromTaggedCars, addMedia, removeMedia} from '../reducers/newpost/newpostActions'
import md5 from 'md5'

import ActionSheet from '@yfuks/react-native-action-sheet';
const TagOptsIOS = [
        '#build',
        '#carspotting',
        '#vr',
        '#forsale',
        'Cancel',
      ],
      TagOptsAndroid = [
        '#build',
        '#part',
        '#carspotting',
        '#vr',
        '#forsale',
      ],
      CANCEL_INDEX = -1,
      DESTRUCTIVE_INDEX = 5


let imageOpts = {
  title: 'Choose Photo',
  mediaType: 'photo',
  quality: '1',
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

let uploadOpts = {
  keyPrefix: "user-uploads/",
  bucket: "tunesquad-user-upload",
  region: 'us-east-1',
  accessKey: "AKIAIYR6P6AQEO3NW2LQ",
  secretKey: "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",
  successActionStatus: 201
}

const dismissKeyboard = require('dismissKeyboard')

const mapStateToProps = (state) => {
  return {
    profileData: profileSelector (state),
    selectedMedia: selectedMediaSelector (state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromTaggedCars: (specId) => {dispatch (removeFromTaggedCars (specId))},
    addMedia: (paths) => {dispatch (addMedia (paths))},
    removeMedia: (path) => {dispatch (removeMedia (path))}
  }
}

class NewPost extends Component {
  constructor (props) {
    super (props)
    this.selectMedia = this.selectMedia.bind (this)
    this.renderMedia = this.renderMedia.bind (this)
    this.selectPostType = this.selectPostType.bind (this)
    this.state = {
      hasAttachments: true,
      source: '',
      fileType: '',
      ext: '',
      fileName: '',
      text: '',
      vrMode: false,
    }
  }

  selectPostType () {
    let {text, source, ext, fileType, fileName} = this.state

    ActionSheet.showActionSheetWithOptions({
      options: (Platform.OS == 'ios') ? TagOptsIOS : TagOptsAndroid,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'blue'
    },
    (buttonIndex) => {
      switch (buttonIndex) {
      case 0: 
        Actions.NewBuild({text, source, ext, fileType, fileName})
        break;
      case 1: 
        Actions.PreviewPost({text, source, ext, fileType, fileName})
        break;
      case 2: 
        Actions.VRPost({text, source, ext, vr: true, fileType, fileName})
        break;
      case 3: 
        Actions.NewListing({text, source, ext, fileType, fileName})
        break;
      default:
        break;
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    let {taggedCars, selectedMedia} = nextProps
    this.setState ({taggedCars, images: selectedMedia})
  }

  selectMedia (opts) {
    ImagePicker.showImagePicker(opts, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        this.setState ({hasError: true})
      }
      else {
        let source, ext, fileName
        if (Platform.OS === 'ios') {
          source = response.uri.replace('file://', '')
          ext = response.uri.split ('.').slice (-1)[0]
          fileName = md5(response.uri.split ('/').slice (-1)[0] + this.props.profileData.user_id) + '.' + ext
        } else {
          source = response.uri
          ext = response.type
          fileName = md5(response.fileName)
        }
        this.setState({
          hasAttachments: true,
          source: source,
          fileType: opts.mediaType,
          ext: ext,
          fileName: fileName,
        });
      }
    });   
  }

  renderMedia () {
    let {source, fileType} = this.state
      , content
    if (source && source.length) {
      if (fileType === 'photo') {
        content = (
          <Image source={{uri: source}} style={PostStyles.primaryImage}/>
        )
      }
      else if (fileType === 'video') {
        content = (
          <Video
            repeat
            resizeMode='cover'
            source={{uri: source}}
            style={PostStyles.primaryImage}
          />
        )
      }
    return (
      <View style={{marginBottom: 8}}>
      {content}
            <TouchableWithoutFeedback
              onPress={()=>{this.setState ({fileType: '', source: ''})}}>
              <View style={{position: 'absolute', right: 8, top: 16}}>
              <Image source={require ('../common/img/x.png')} style={{height:32, width: 32}}/>
              </View>
            </TouchableWithoutFeedback>
      </View>
    )
    } else {
      return (<View/>)
    }
  }

  render () {
    const leftItem = {title: 'Back', onPress: Actions.pop}
        , rightItem = {title: 'Next', onPress: ()=>{this.selectPostType()}}

    let {profileData} = this.props
    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          title="Create Post"
          leftItem={leftItem}
          rightItem={rightItem}
          style={General.headerStyle}/>
        <ScrollView style={{marginBottom: 50}}>
        <View>
        {this.renderMedia()}
          <View style={{margin: 16, flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
              <Image source={{uri: this.props.profileData.picture}} style={PostStyles.userPhotoStyle}/>
              <TextInput
                multiline={true}
                onChangeText={(text) => {
                  this.setState({text});
                }}
                placeholder="OMG IT'S FAST"
                style={NewPostStyles.largeBlockInput}/>
              <View style={{flexDirection: 'row'}}>
              <F8Button 
                icon={require ('../common/img/camera.png')} 
                onPress={()=>this.selectMedia (imageOpts)} 
                type="tertiary" 
                caption="Photo" 
                style={{flex: 1}}/>
              <F8Button 
                icon={require ('../common/img/video.png')} 
                onPress={()=>this.selectMedia (videoOpts)} 
                type="tertiary" 
                caption="Video" 
                style={{flex: 1}}/>
              </View>
          </View>
        </View>
        </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NewPost)
