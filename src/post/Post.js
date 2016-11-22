'use strict'
import React, {Component} from 'react'
import {
  Image,
  PropTypes,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import moment from 'moment'

import ProfilePicture from '../common/ProfilePicture'
import {PostStyles, General} from '../styles'
import {LikeBtn, CommentBtn} from '../components'

export default class Post extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    console.log ('posts.props', this.props)
    return (<View/>)
    // let {post, tags, user, likes, postId, comments} = this.props.data,
    //     {media, created, title, original} = post
    //   , daysAgo = moment(created).fromNow()
    //   , imageContent
    //   , likesContent = (<LikeBtn postId={postId} numlikes={likes.length}/>)
    //   , commentsContent = (<CommentBtn postId={postId} commentsCnt={comments}/>)
    //   , tagsContent = (tags && tags.length)?(<ScrollView style={PostStyles.tags} showsHorizontalScrollIndicator={false} horizontal={true} containerStyle={PostStyles.tagsContainer}>}
    //             {tags.map ((tag, idx)=> {return ( <Text key={idx} style={PostStyles.tag}>{`#${tag}`}</Text> )})}
    //             </ScrollView>):(<View/>)
    // imageContent = (
    //   <View style={{flex: 1}}>
    //   <View style={PostStyles.header}>
    //     {title && (<Text style={PostStyles.title}>{'YOOO'}</Text>)}
    //     <Image source={{uri:user.picture}} style={PostStyles.userPhotoStyle}/>
    //       <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
    //         <Text style={PostStyles.authorName}>{`${user.name}`}</Text>
    //         <Text style={PostStyles.created}>{`${daysAgo}`}</Text>
    //       </View>
    //   </View>
    //   <Image resizeMode='contain' style={PostStyles.primaryImage} source={{uri: original[0]}}/>
    //   {tagsContent}
    //   </View>
    // )

    // return (
    //     <View style={PostStyles.container}>
    //       {imageContent}
    //       <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
    //       {likesContent}
    //       {commentsContent}
    //       </View>
    //     </View>
    // )
  }
}
