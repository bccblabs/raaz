'use strict'

const {
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
