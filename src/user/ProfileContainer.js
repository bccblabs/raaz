'use strict'

import React, {Component} from 'react'
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading3} from '../common/F8Text'
import {DetailStyles, PostStyles, General, Titles} from '../styles'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import {BuildsPager} from '../build'
import {PostsByUserId} from '../post'

import {BackSquare} from '../components'
export default class ProfileContainer extends Component {
  render () {
    let {profileData, btnContent, userId, initial} = this.props
      , foregroundContent = profileData?(
        <View style={{flex: 1}}>
          <View style={DetailStyles.userInfoContainer}>
            <Image style={PostStyles.largeUserPhoto} source={{uri: profileData.picture}}/>
            <Text style={DetailStyles.lightTitle}>{profileData.name}</Text>
          </View>
        </View>
      ):(<View/>)

    return (
      <ParallaxScrollView
        backgroundColor="transparent"
        contentBackgroundColor="white"
        backgroundSpeed={1}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={64}
        renderForeground={()=>{return foregroundContent}}
        renderBackground={() => <Image source={require ('../common/img/2jz.png')} style={DetailStyles.VRImageHolder}/>}
        renderFixedHeader={()=>{return initial?(<View/>):(<BackSquare/>)}}
        >
        <View style={{flex: 1, margin:8, alignItems: 'center', flexDirection: 'column'}}>
        {btnContent}
        <View>
        <BuildsPager style={{flex: 1}} userId={userId}/>
        </View>
        <Heading3 style={Titles.filterSectionTitle}>{"POSTS"}</Heading3>
        <PostsByUserId style={{flex: 1}} userId={userId}/>
        </View>
      </ParallaxScrollView>
    )
  }
}
