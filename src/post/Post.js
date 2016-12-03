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
import {LikeBtn, CommentBtn} from '../components'
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
      , descText 
      , name
    //   , likesContent = (<LikeBtn postId={postId} numlikes={likes.length}/>)
    //   , commentsContent = (<CommentBtn postId={postId} commentsCnt={comments}/>)
      if (postType === 'new_build') {
        let {buildId, media} = build

        descText = 'Added a New Build'
        name = build.name

        postContent = (
        <TouchableWithoutFeedback onPress={()=>{Actions.BuildDetails ({buildId})}}>
          <Image style={{flex: 1}} source={{uri: media[0]}}/>
        </TouchableWithoutFeedback>
        )
      }
      else if (postType === 'build_log') {
        let {partId, medium} = part
          , {buildId, media} = build

        descText = 'Installed a New Part'
        name = part.name

        postContent = (
        <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableWithoutFeedback onPress={()=>{Actions.BuildDetails ({buildId}) }}>
            <Image style={{flex: 1, margin: 4}} source={{uri: media[0]}}/>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{Actions.PartDetails ({data: {partId: partId, specId: specId}})}}>
            <Image style={{flex: 1, margin: 4}} source={{uri: medium[0]}}/>
        </TouchableWithoutFeedback>
        </View>
        )
      }

      else if (postType === 'build_comment' || !postType) {
        let {text} = post
          , {buildId} = build
          , media

        if (post.media) {
          media = post.media
        } else {
          media = build.media[0]
        }

        descText = 'Posted a Comment'
        name = build.name
        postContent = (
        <View style={{flex: 1}}>
          <Text style={{paddingHorizontal: 8, paddingBottom: 16}}>{`"${text}"`}</Text>
          <TouchableWithoutFeedback onPress={()=>{Actions.BuildDetails ({buildId})}}>
            <Image style={{flex: 1}} source={{uri: media}}/>
          </TouchableWithoutFeedback>
        </View>
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
          <Text style={[PostStyles.primaryTitle, {position: 'absolute', left: 4, bottom: 18}]}>{name}</Text>
        </View>   
    )
  }
}
