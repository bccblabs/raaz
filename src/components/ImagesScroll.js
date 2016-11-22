'use strict'
import React, {Component} from 'react'
import {Image, ScrollView, TouchableWithoutFeedback, View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {DetailStyles} from '../styles'

export default class ImagesScroll extends Component {
  render () {
    let {media} = this.props
    return (
        <ScrollView
          style={{marginTop: 8, flex: 1, height: 150}}
          containerStyle={{flex: 1, height: 150}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {media.map ((mediaLink, idx)=> (
            <TouchableWithoutFeedback style={{flex: 1}} key={`${idx}`} onPress={()=>Actions.PhotoSwiper({showIndex: idx, imgList: media})}>
            <Image style={DetailStyles.scrollImage} source={{uri:mediaLink}}/>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
    )    
  }
}
