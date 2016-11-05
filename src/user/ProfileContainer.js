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
import F8Button from '../common/F8Button'
import {DetailStyles, PostStyles, General} from '../styles'

export default class ProfileContainer extends Component {
  render () {
    let {profileData, listContent, btnContent, headerContent, currentUser} = this.props
      , {picture, name, email, phone, facebook, instagram} = profileData
      , topbtn = (
          <F8Button 
            icon={require ('../common/img/car.png')} 
            onPress={Actions.NewBuild}
            style={{flex: 1}}            
            type="search" caption="New Build"/>
        )
      , btmbtn = (
          <F8Button 
            icon={require ('../common/img/comment.png')} 
            onPress={Actions.NewPost}
            type="search" 
            style={{flex: 1}}            
            caption="New Post"/>        
        )
      , foregroundContent = (
        <View style={{flex: 1}}>
          <View style={DetailStyles.userInfoContainer}>
            <Image style={PostStyles.largeUserPhoto} source={{uri: picture}}/>
            <Text style={DetailStyles.lightTitle}>{name}</Text>
          </View>
          <View style={DetailStyles.userButtonContainer}>
          </View>
        </View>
      )
      , header = currentUser?headerContent:(<View/>)

    return (
      <View style={{flex: 1, marginBottom: 50}}>
      <ParallaxScrollView
        backgroundColor="transparent"
        contentBackgroundColor="white"
        backgroundSpeed={1}
        parallaxHeaderHeight={200+64}
        renderFixedHeader={() => header}
        fixedHeaderHeight={64}
        renderForeground={()=>{return foregroundContent}}
        renderBackground={() => <Image source={require ('../common/img/2jz.png')} style={DetailStyles.VRImageHolder}/>}
        >
        <View style={{flex: 1, margin:8, alignItems: 'center'}}>
        {currentUser?(
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: -1}}>
          {topbtn}
          {btmbtn}
          </View>
          ):(<View/>)
        }
        {listContent}
        </View>
      </ParallaxScrollView>
      </View>
    )
  }
}
