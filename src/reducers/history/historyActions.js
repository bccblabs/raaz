'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'

const {
  ADD_TO_SAVED_SPECS,
  REMOVE_SAVED_SPECS,
  TOGGLE_SAVE_PRODUCT,
  SET_ACCESS_TOKEN,
  SET_ID_TOKEN,
  LOAD_HISTORY
} = require  ('../../constants').default



export function addSpecToHistory (make, model, submodel, specInfo) {
  let {horsepower, specId} = specInfo
  return {
    type: ADD_TO_SAVED_SPECS,
    payload: {make, model, submodel, specId, horsepower}
  }
}


export function removeSpecToHistory (specId) {
  return {
    type: REMOVE_SAVED_SPECS,
    payload: specId
  }
}

export function toggleSaveProduct (part) {
  return {
    type: TOGGLE_SAVE_PRODUCT,
    payload: Object.assign ({}, {...part}, {media: part.media && part.media[0] || ''})
  }
}


export function loadHisory (history) {
  return {
    type: LOAD_HISTORY,
    payload: history
  }
}


export function setAccessToken (access_token) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: access_token
  }
}

export function loadAccessToken (history) {
  return {
    type: LOAD_ACCESS_TOKEN,
    payload: history
  }
}

export function setIdToken (id_token) {
  return {
    type: SET_ID_TOKEN,
    payload: id_token
  }
}

export function loadIdToken (history) {
  return {
    type: LOAD_ID_TOKEN,
    payload: history
  }
}
