'use strict'

import React, {Component} from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import F8Header from '../common/F8Header'
import {DetailStyles, PostStyles, General} from '../styles'

export default class ProfileContainer extends Component {
  render () {
    let {profileData, listContent, btnContent, headerContent} = this.props
      , {picture, name, email, phone, facebook, instagram} = profileData
      , foregroundContent = (
        <View style={DetailStyles.userInfoContainer}>
          <Image style={PostStyles.largeUserPhoto} source={{uri: picture}}/>
          <Text style={DetailStyles.lightTitle}>{name}</Text>
        </View>
      )

    return (
      <View style={{flex: 1, marginBottom: 50}}>
      <ParallaxScrollView
        backgroundColor="transparent"
        contentBackgroundColor="white"
        backgroundSpeed={1}
        parallaxHeaderHeight={200+64}
        renderFixedHeader={() => headerContent}
        fixedHeaderHeight={64}
        renderForeground={()=>{return foregroundContent}}
        renderBackground={() => <Image source={require ('../common/img/2jz.png')} style={DetailStyles.VRImageHolder}/>}
        >
        <View style={{flex: 1, margin:8, alignItems: 'center'}}>
        {listContent}
        </View>
      </ParallaxScrollView>
      {btnContent}
      </View>
    )
  }
}
