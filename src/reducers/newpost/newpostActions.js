'use strict'

const {
  PICK_MAKE,
  PICK_MODEL,
  PICK_SUBMODEL,
  PICK_SPECID,

  ADD_TO_TAGGED_CARS,
  REMOVE_FROM_TAGGED_CARS,

  ADD_MEDIA,
  REMOVE_MEDIA
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
