'use strict'

const {
  ADD_TO_SAVED_SPECS,
  REMOVE_SAVED_SPECS,
  TOGGLE_SAVE_PRODUCT,
  SET_ACCESS_TOKEN,
  SET_ID_TOKEN,
  SET_REFRESH_TOKEN,
  LOAD_HISTORY,
} = require ('../../constants').default

import {Map, List} from 'immutable'
const InitialState = require ('./historyInitialState').default
const initialState = new InitialState

import keys from 'lodash/keys'

export default function historyReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)
  switch (action.type) {

    case ADD_TO_SAVED_SPECS: {
      let {payload} = action
        , specs = state.get ('specs').set (payload.specId, payload)
      return state.setIn (['specs'], specs, val=> specs)
    }

    case REMOVE_SAVED_SPECS: {
      let {payload} = action
        , specs = state.get ('specs').delete (payload)
      return state.setIn (['specs'], specs, val=> specs)
    }

    case TOGGLE_SAVE_PRODUCT: {
      let {payload} = action
        , {partId} = payload
        , parts = state.get ('parts')
      if (parts.has (partId)) {
          parts = parts.delete (partId)
      } else {
          parts = parts.set (payload.partId, payload)
      }
      return state.setIn (['parts'], parts, val=> parts)
    }

    case SET_ACCESS_TOKEN: {
      return state.setIn (['access_token'], action.payload)
    }

    case SET_ID_TOKEN: {
      return state.setIn (['id_token'], action.payload)
    }

    case SET_REFRESH_TOKEN: {
      return state.setIn (['refresh_token'], action.payload)
    }

    case LOAD_HISTORY: {
      let {history} = action.payload
        , wl = ['parts', 'specs', 'access_token', 'id_token', 'refresh_token']
      if (!history) return initialState
      wl.forEach ((key)=>{
        if (key === 'access_token' || key === 'id_token' || key === 'refresh_token') state = state.setIn ([key], history[key], val=> history[key])
        else {
          if (!history || !history[key]) state = state.set (key, new (Map))
          else {
            let value = history[key]
              , valueMap = new (Map)
            keys (value).forEach ((keyy)=> {valueMap = valueMap.set (keyy, value[keyy])})
            state = state.set (key, valueMap)
          }
        }
      })
      return state
    }

    default:
    return state
  }
}
