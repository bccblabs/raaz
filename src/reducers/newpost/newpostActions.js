'use strict'

const {
  ADD_MEDIA,
  REMOVE_MEDIA,

  LINK_BUILD,
  UNLINK_BUILD,

  SET_POST_TEXT,

  SET_UPLOAD_PROG,
  UPLOAD_S3,
  CREATE_POST,

} = require ('../../constants').default

import {resetBuildSpecs} from '../build/buildActions'
import {fetchPosts} from '../post/postActions'
import {S3_OPTS, REQ_TIMEOUT, API_ENDPOINT, REQ_OPTS} from '../../constants' 
import {requestWithTimeout} from '../../utils'
import {RNS3} from 'react-native-aws3';

export function addMedia (medialist) {
  return {
    type: ADD_MEDIA,
    payload: medialist
  }
}
  
export function removeMedia (path) {
  return {
    type: REMOVE_MEDIA,
    payload: path
  }
}

export function addToTaggedCars (make, model, submodel, specId) {
  return {
    type: ADD_TO_TAGGED_CARS,
    payload: {make, model, submodel, specId}
  }
}

export function removeFromTaggedCars (specId) {
  return {
    type: REMOVE_FROM_TAGGED_CARS,
    payload: specId
  }
}

export function setPostText (text) {
  return {
    type: SET_POST_TEXT,
    payload: text
  }
}

export function linkBuild (build) {
  return {
    type: LINK_BUILD,
    payload: build
  }
}

export function removeBuild (buildId) {
  return (dispatch) => {
    dispatch (unlinkBuild (buildId))
    dispatch (resetBuildSpecs ())
  }
}

export function unlinkBuild (buildId) {
  return {
    type: UNLINK_BUILD,
    payload: buildId
  }
}

export function setUploadProgress (pct) {
  return {
    type: SET_UPLOAD_PROG,
    payload: pct
  }
}

export function uploadToS3 (file, post) {
  return (dispatch) => {
    return dispatch ({
      type: UPLOAD_S3,
      payload: new Promise (resolve => {
          RNS3.put(file, S3_OPTS)
          .progress ((e)=>{
            dispatch (setUploadProgress (e.loaded / e.total))
          })
          .then(response => {
            if (response.status !== 201) {
              throw new Error (response.status)
            }
            else {
              console.log (response.body.postResponse)
              resolve (response.body.postResponse)
            }
          })
      })
    })
    .then (({value, action})=> {
      let {location} = value
      dispatch (createPost (Object.assign (post, {location})))
    })
    .catch ((error) => {
      console.warn (error)
    })
  }
} 

export function createPost (data) {
  return (dispatch) => {
    return dispatch ({
    type: CREATE_POST,
    payload: requestWithTimeout (5000, 
      API_ENDPOINT + '/post', 
      Object.assign ({},
        REQ_OPTS, 
        {method: 'POST', body: JSON.stringify (data)},
    ))
  })
  .then (()=> {
    dispatch (fetchPosts())
  })
  }
}
