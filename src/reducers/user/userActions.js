'use strict'
import {Linking} from 'react-native'
import qs from 'qs'
import {fetchBuildsByUserId} from '../tuning/filterActions'
import {Actions} from 'react-native-router-flux'
import {
  AUTH0_SIGNIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  API_ENDPOINT,

} from '../../constants'

import {
  CALL_API,
  Schemas
} from '../../middlewares/api'


const {
  LOGIN,
  LOGGED_IN,
  UPDATE_EMAIL,
  UPDATE_PHONE,
  UPDATE_ADDRESS,
  UPDATE_CITY,
  UPDATE_STATE,
  UPDATE_COUNTRY,
  UPDATE_ZIP,

  POST_COMMENT_REQ,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERR,

  REPLY_COMMENT_REQ,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_ERR,

  TOGGLE_POST_LIKE,
  TOGGLE_ON_START,

  CREATE_POST,

} = require ('../../constants').default

function handleLinking (event) {
  let {url} = event,
      params = url.replace (AUTH0_CALLBACK_URL,'').split ('#')[1],
      {access_token, id_token, refresh_token} = qs.parse (params)

  Actions.main({access_token: access_token, id_token: id_token, refresh_token: refresh_token})
}

export function setUserData (profileData) {
  return {
    type: LOGGED_IN,
    payload: profileData
  }
}


function fetchUserBuilds () {
  return (dispatch, getState) => {
    let userId = getState().user.profileData.user_id
    if (userId) {
      dispatch (fetchBuildsByUserId(null, userId))
    }
  }
}

Linking.addEventListener ('url', handleLinking)

async function _loginAuth0 (endpoint) {
  Linking.openURL (endpoint)
}

function loginAuth0() {
  console.log (AUTH0_SIGNIN)
  _loginAuth0(AUTH0_SIGNIN)
}

function logOut() {
  return (dispatch) => {
    return dispatch({
      type: 'LOGGED_OUT',
    })
  }
}

function postComment (comment, postId) {
  let endpoint = '/post/' + postId + '/comment'
  return {
    comment,
    [CALL_API]: {
      endpoint,
      types: [POST_COMMENT_REQ, POST_COMMENT_SUCCESS, POST_COMMENT_ERR],
      schema: Schemas.COMMENT_ARRAY,
    }
  }
}

function replyComment (comment, commentId) {
  let endpoint = '/comment/' + commentId + '/reply'
  return {
    comment,
    [CALL_API]: {
      endpoint,
      types: [REPLY_COMMENT_REQ, REPLY_COMMENT_SUCCESS, REPLY_COMMENT_ERR],
      schema: Schemas.REPLY_ARRAY,
    }
  }
}

function togglePostLike (postId) {
  return {
    type: TOGGLE_POST_LIKE,
    payload: postId
  }
}

function toggleOnStart () {
  return { type: TOGGLE_ON_START}
}

module.exports = {toggleOnStart, fetchUserBuilds , loginAuth0, logOut, setUserData};
