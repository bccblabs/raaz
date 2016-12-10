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
import {WIDTH, HEIGHT, PostStyles, General, Header} from '../styles'
import {LikeBtn, CommentBtn, LinkContent} from '../components'
import F8Button from '../common/F8Button'
export default class Post extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    let {post, tags, user, likes, postId, comments, postType, build, part, specId} = this.props.data
      , {media, created, mediaType} = post
      , {user_id, picture} = user
      , daysAgo = moment(created).fromNow()
      , postContent
      , imageContent
      , linkContent
      , descText 
      , name
    //   , likesContent = (<LikeBtn postId={postId} numlikes={likes.length}/>)
    //   , commentsContent = (<CommentBtn postId={postId} commentsCnt={comments}/>)
      if (postType === 'new_build') {
        let {buildId, media} = build

        descText = 'Added a New Build'
        linkContent = (
          <LinkContent name={build.name} image={media[0]} linkAction={()=>{Actions.BuildDetails ({buildId})}}/>
        )
      }
      else if (postType === 'build_log' && part && build) {
        let {partId, medium} = part
          , {buildId, media} = build

        descText = 'Installed a New Part'
        name = part.name

        linkContent = (
        <View style={{flex: 1}}>
          <LinkContent name={build.name} image={media[0]} linkAction={()=>{Actions.BuildDetails ({buildId})}}/>
          <LinkContent name={part.name} image={medium[0]} linkAction={()=>{Actions.PartDetails ({data: {partId: partId, specId: specId}})}}/>
        </View>
        )
      }

      else if (postType === 'build_comment') {
        let {text} = post
          , {buildId} = build
          , media

        if (post.media) {
          media = post.media
        } else {
          media = build.media[0]
        }
        descText = 'Posted a Comment'
        linkContent = (
          <LinkContent name={build.name} image={media} linkAction={()=>{Actions.BuildDetails ({buildId})}}/>
        )

        postContent = (
          <Text style={{paddingHorizontal: 8, paddingBottom: 16, fontWeight: 'bold'}}>{`"${text}"`}</Text>
        )
      }

      else if (postType === 'part_comment' || postType === 'part_log') {
        let {text} = post
          , {partId} = part
        descText = 'Posted a Comment'
        specId = post.specId
        postContent = (
        <View style={{flex: 1}}>
          <Text style={{paddingHorizontal: 8, paddingBottom: 16, fontWeight: 'bold'}}>{`"${text}"`}</Text>
        </View>
        )
        linkContent = (
          <LinkContent name={part.name} image={part.medium[0]} linkAction={()=>{Actions.PartDetails ({data: {partId: partId, specId: specId}})}}/>
        )
      }


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
          {postContent}
          {
            imageContent ? (
              <View style={PostStyles.imageContainer}>
              {imageContent}
              </View>
            ): (<View/>)
          }
          {linkContent}
          
          {
            tags.length ? (
              <ScrollView 
                style={{flex: -1,  marginVertical: 0, marginHorizontal: 8}}
                horizontal
                showsHorizontalScrollIndicator
                showsVerticalScrollIndicator
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{
                    backgroundColor: 'transparent', 
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                {
                  tags.map ((tag, idx)=> {return (<Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})
                }
              </ScrollView>     
            ) : (<View/>)
          }

        </View>   
    )
  }
}
