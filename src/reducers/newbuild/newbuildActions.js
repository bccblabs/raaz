'use strict'

const {
  PICK_MAKE,
  PICK_MODEL,
  PICK_SUBMODEL,
  PICK_SPECID,

  ADD_BUILD_MEDIA,
  REMOVE_BUILD_MEDIA,
  SET_PRIMARY_IMAGE,
} = require ('../../constants').default

export function setMake (value) {
  return {
    type: PICK_MAKE,
    payload: value
  }
}

export function setModel (value) {
  return {
    type: PICK_MODEL,
    payload: value
  }
}

export function setSubmodel (value) {
  return {
    type: PICK_SUBMODEL,
    payload: value
  }
}

export function setSpecId (value) {
  return {
    type: PICK_SPECID,
    payload: value
  }
}


export function addMedia (medialist) {
  return {
    type: ADD_BUILD_MEDIA,
    payload: medialist
  }
}
  
export function removeMedia (path) {
  return {
    type: REMOVE_BUILD_MEDIA,
    payload: path
  }
}

export function setPrimaryImage (path) {
	return {
		type: SET_PRIMARY_IMAGE,
		payload: path
	}
}