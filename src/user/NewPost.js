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

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import { Actions } from 'react-native-router-flux'


import ImagePicker from 'react-native-image-crop-picker'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import { Heading3 } from '../common/F8Text'

import {FilterCard} from '../components'

import { NewPostStyles, General, PostStyles, Titles } from '../styles'
import {ImageOptions, VideoOptions} from '../constants'

import {taggedCars, profileSelector, selectedMediaSelector} from '../selectors'
import {removeFromTaggedCars, addMedia, removeMedia} from '../reducers/newpost/newpostActions'

const dismissKeyboard = require('dismissKeyboard')

const mapStateToProps = (state) => {
  return {
    profileData: profileSelector (state),
    selectedMedia: selectedMediaSelector (state)
    // taggedCars: taggedCars (state),
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
    this.pickMedia = this.pickMedia.bind (this)
    this.takePhoto = this.takePhoto.bind (this)
    this.renderEditLog = this.renderEditLog.bind (this)
    this.renderImages = this.renderImages.bind (this)
    this.state = {
      profileData: props.profileData,
      images: props.selectedMedia,
      taggedCars: props.taggedCars,
    }
  }

  componentWillReceiveProps (nextProps) {
    let {taggedCars, selectedMedia} = nextProps
    this.setState ({taggedCars, images: selectedMedia})
  }

  pickMedia () {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true
    }).then(images => {
      let photos = images.map ((image)=>image['path'])
      this.props.addMedia (photos)
    });
  }

  takePhoto () {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      let path = image['path'];
      this.props.addMedia ([path])
    });    
  }

  renderEditLog() {
    const {picture, name} = this.state.profileData
        , {taggedCars} = this.state
        , {removeFromTaggedCars} = this.props
    return (
      <View style={{paddingTop: 4, paddingBottom: 20}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={false}
        style={NewPostStyles.taggedCarsScroll}>
        { taggedCars && taggedCars.map ((car, idx)=> {
          return (<F8Button
                    key={`cartag-${idx}`}
                    type="carTag"
                    onPress={()=>{removeFromTaggedCars (car.specId)}}
                    icon={require ('../common/img/x.png')}
                    caption={`${car.make} ${car.model} ${car.submodel}`}
                    style={{margin: 4}}/>)
        })
        }
      </ScrollView>
      <Image source={{uri: picture}} style={PostStyles.userPhotoStyle}/>
      <TextInput
        placeholder="OMG IT'S FAST"
        multiline={true}
        maxLength={140}
        style={NewPostStyles.largeBlockInput}/>
      </View>
    )
  }

  renderImages () {
    let {images} = this.state
    return images.length>0?
      ( 
        <View>
              <Heading3 style={Titles.buildSectionTitle}>{"Photos"}</Heading3>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            style={{margin: 8}}
            showsHorizontalScrollIndicator={false}>
            {
              images.map ((img, idx)=>{
                return (
                <View key={idx} style={{marginLeft: 4}}>
                <TouchableWithoutFeedback
                  onPress={()=>{this.props.removeMedia (img)}}>
                  <Image source={require ('../common/img/x.png')} style={{height:16, width: 16,alignSelf: 'flex-end'}}/>
                </TouchableWithoutFeedback>
                <Image style={{width: 100, height: 100, marginHorizontal: 8}} source={{uri: img}}/>
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
    const leftItem = {icon: require ('../common/img/back.ios.png'), onPress: Actions.pop}
        , rightItem = {icon: require ('../common/img/publish.png'), onPress: Actions.PreviewPost}

    let {profileData} = this.props

    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
      <View style={{flex: 1}}>
        <F8Header
          foreground="dark"
          leftItem={leftItem}
          rightItem={rightItem}
          title="New Post"
          style={General.headerStyle}/>
        {this.renderEditLog()}
        {this.renderImages()}
        <View style={{position: 'absolute', bottom: 0}}>
        <F8Button 
          icon={require ('../common/img/car.png')} 
          onPress={Actions.PickBuild} 
          type="tertiary" 
          caption="Tag My Build" 
          style={NewPostStyles.bottomButtonStyle}/>
        <F8Button 
          icon={require ('../common/img/photo.png')} 
          onPress={this.pickMedia} 
          type="tertiary" 
          caption="Choose From Library" 
          style={NewPostStyles.bottomButtonStyle}/>
        <F8Button 
          icon={require ('../common/img/panovideo.png')} 
          onPress={this.takePhoto} 
          type="tertiary" 
          caption="Take Photo Using Camera" 
          style={NewPostStyles.bottomButtonStyle}/>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (NewPost)
