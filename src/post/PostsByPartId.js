'use strict'

import {connect} from 'react-redux'
import {postByPartIdSelector, postPaginationByPartIdSelector} from '../selectors'
import {fetchPostsByPartId} from '../reducers/post/postActions'

import PostList from './PostList'

const mapStateToProps = (state, props) => {
  return {
    data: postByPartIdSelector(state, props),
    pagination: postPaginationByPartIdSelector(state, props),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsByPartId (pageUrl, props.PartId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
