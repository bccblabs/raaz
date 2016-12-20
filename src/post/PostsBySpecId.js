'use strict'

import {connect} from 'react-redux'
import {postBySpecIdSelector, postPaginationBySpecIdSelector} from '../selectors'
import {fetchPostsBySpecId} from '../reducers/post/postActions'

import PostList from './PostList'

const mapStateToProps = (state, props) => {
  return {
    data: postBySpecIdSelector(state, props),
    pagination: postPaginationBySpecIdSelector(state, props),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPostsBySpecId (pageUrl, props.specId))}
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostList)
