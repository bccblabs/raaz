'use strict'

import {connect} from 'react-redux'
import {postByUserIdSelector, postPaginationByUserIdSelector} from '../selectors'
import {fetchPostsByUserId} from '../reducers/post/postActions'

import PostList from './PostList'

const mapStateToProps = (state, props) => {
  return {
    data: postByUserIdSelector(state, props),
    pagination: postPaginationByUserIdSelector(state, props),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsByUserId (pageUrl, props.userId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
