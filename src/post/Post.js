'use strict'
import React, {Component} from 'react'
import {
  Image,
  PropTypes,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import moment from 'moment'

import ProfilePicture from '../common/ProfilePicture'
import {WIDTH, HEIGHT, PostStyles, General, Header, NewPostStyles} from '../styles'
import {LikeBtn, CommentBtn, LinkContent} from '../components'
import F8Button from '../common/F8Button'
export default class Post extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    let {post, tags, user, likes, postId, comments, postType, build, part, specId} = this.props.data
      , {media, created, mediaType, text} = post
      , {user_id, picture} = user
      , daysAgo = moment(created).fromNow()
      , postContent
      , mediaContent

      , buildLink
      , partLink
      , linkContent

      , descText
    //   , likesContent = (<LikeBtn postId={postId} numlikes={likes.length}/>)
    //   , commentsContent = (<CommentBtn postId={postId} commentsCnt={comments}/>)
    if (build) descText = ' [build]'
    if (part && part.length) descText += ' [part]'

    mediaContent = media && media[0] && mediaType === 'photo' ? (
          <TouchableWithoutFeedback onPress={()=>{}}>
          <Image style={[PostStyles.primaryImage]} source={{uri: media}}/>
          </TouchableWithoutFeedback>
    ):(<View/>)

    buildLink = build && build.name ?(<LinkContent name={build.name} large image={build.media[0]} linkAction={()=>{Actions.BuildDetails ({buildId: build.buildId})}}/>):(<View/>)
    partLink = part && part.length ? part.map ((partLink, idx)=>(<LinkContent key={`link-${idx}`} name={partLink.name} image={partLink.medium[0]} linkAction={()=>{Actions.PartDetails ({data: {partId: partLink.partId, specId: build.specId}})}}/>)) : (<View/>)

    linkContent = (
        <View style={{flex: 1}}>
        {buildLink}
        {partLink}
        </View>
    )
      // else if (postType === 'build_log' && part && build) {
      //   let {partId, medium} = part
      //     , {buildId, media} = build

      //   descText = '[Part]'
      //   name = part.name

      //   linkContent = (
      //   <View style={{flex: 1}}>
      //     <LinkContent name={part.name} image={medium[0]} linkAction={()=>{Actions.PartDetails ({data: {partId: partId, specId: specId}})}}/>
      //   </View>
      //   )
      // }

      // else if (postType === 'build_comment') {
      //   let {text} = post
      //     , {buildId} = build
      //     , media

      //   if (post.media) {
      //     media = post.media
      //   } else {
      //     media = build.media[0]
      //   }
      //   descText = '[Comment]'
      //   linkContent = (
      //     <LinkContent name={build.name} image={media} linkAction={()=>{Actions.BuildDetails ({buildId})}}/>
      //   )

      //   postContent = (
      //     <Text style={{paddingHorizontal: 8, paddingBottom: 16, fontWeight: 'bold'}}>{`"${text}"`}</Text>
      //   )
      // }

      // else if (postType === 'part_comment' || postType === 'part_log') {
      //   let {text} = post
      //     , {partId} = part
      //   descText = '[Comment]'
      //   specId = post.specId
      //   postContent = (
      //   <View style={{flex: 1}}>
      //     <Text style={{paddingHorizontal: 8, paddingBottom: 16, fontWeight: 'bold'}}>{`"${text}"`}</Text>
      //   </View>
      //   )
      //   linkContent = (
      //     <LinkContent name={part.name} image={part.medium[0]} linkAction={()=>{Actions.PartDetails ({data: {partId: partId, specId: specId}})}}/>
      //   )
      // }


    return (
        <View style={PostStyles.container}>
          <TouchableWithoutFeedback onPress={()=>{Actions.UserPage ({userId: user_id}) }}>
            <View style={Header.container}>
              <Image 
                style={[PostStyles.userPhotoStyle, {marginRight: 8,}]} 
                source={{uri: picture}}
              />
              <Text style={[PostStyles.tag, {fontWeight: 'bold'}]}>{descText}</Text>
              <Text style={{fontSize: 8, fontWeight: '600', color: '#2f4f4f', position: 'absolute', top: 2, right: 8}}>{daysAgo}</Text>
            </View>
          </TouchableWithoutFeedback>
          {text?(<Text style={PostStyles.text}>{text}</Text>):(<View/>)
          }
          {mediaContent}
          {linkContent}
        </View>   
    )
  }
}
