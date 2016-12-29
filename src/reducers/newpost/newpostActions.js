'use strict'

const {
  ADD_MEDIA,
  REMOVE_MEDIA,

  LINK_BUILD,
  UNLINK_BUILD,

  SET_POST_TEXT,
} = require ('../../constants').default

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


export function unlinkBuild (buildId) {
  return {
    type: UNLINK_BUILD,
    payload: buildId
  }
}