'use strict'

import {CALL_API, Schemas} from '../../middlewares/api'
const {
  ADD_PART_MEDIA,
  REMOVE_PART_MEDIA,
  SET_PART_IMAGE,
  SET_PART_NAME,

  ADD_PART_SPEC,
  EDIT_PART_SPEC,
  REMOVE_PART_SPEC,
  SET_PART_SPEC, 

  PART_TAG_SPECID,
  PART_REMOVE_SPECID,

  CREATE_PART_REQUEST,
  CREATE_PART_SUCCESS,
  CREATE_PART_ERROR,

} = require ('../../constants').default



export function addPartMedia (medialist) {
  return {
    type: ADD_PART_MEDIA,
    payload: medialist
  }
}
export function removePartMedia (path) {
  return {
    type: REMOVE_PART_MEDIA,
    payload: path
  }
}
export function setPartImage (path, idx) {
	return {
		type: SET_PART_IMAGE,
		payload: {path, idx}
	}
}
export function setPartName (value) {
  return {
    type: SET_PART_NAME,
    payload: value
  }
}


export function addPartSpecEntry (name, value) {
  return {
    type: ADD_PART_SPEC,
    payload: {name, value}
  }
}
export function editPartSpecEntry (name, value) {
  return {
    type: EDIT_PART_SPEC,
    payload: {name, value}
  }
}
export function removePartSpecEntry (name) {
  return {
    type: REMOVE_PART_SPEC,
    payload: name
  }
}
