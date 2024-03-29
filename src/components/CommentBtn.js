'use strict'

import React, {Component} from 'react'

import F8Button from '../common/F8Button'

import {Actions} from 'react-native-router-flux'

export default class CommentBtn extends Component {
  render () {
    let {postId, commentsCnt} = this.props
    return (
      <F8Button
        onPress={()=>{Actions.Comments ({postId})}}
        type="tertiary" caption={`${commentsCnt} comments`}
        icon={require ('../common/img/comment.png')}
      />
    )
  }
}
