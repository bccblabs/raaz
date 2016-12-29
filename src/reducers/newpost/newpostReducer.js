'use strict'

const {
  ADD_MEDIA,
  REMOVE_MEDIA,

  LINK_BUILD,
  UNLINK_BUILD,

  SET_POST_TEXT,

} = require ('../../constants').default

const InitialState = require ('./newpostInitialState').default
const initialState = new InitialState

export default function NewPostReducer (state=initialState, action) {
 
  if (!(state instanceof InitialState)) return state.merge (initialState)

  let nextState

  switch (action.type) {

    case LINK_BUILD: {
      let {payload} = action
        , linkedBuilds = state.get (['linkedBuilds']).set (payload.buildId, payload)
      return state.setIn (['linkedBuilds'], linkedBuilds, val=>linkedBuilds)
    }

    case UNLINK_BUILD: {
      let {payload} = action
        , linkedBuilds = state.get ('linkedBuilds').delete (payload)
      return state.setIn (['linkedBuilds'], linkedBuilds, val=> linkedBuilds)
    }

    case ADD_MEDIA: {
      let {payload} = action
        , selectedMedia = state.getIn (['media'])
        , newList = selectedMedia.push (...payload)

      nextState = state.setIn (['media'], newList, val=>newList)
      return nextState
    }

    case REMOVE_MEDIA: {
      let {payload} = action
        , selectedMedia = state.getIn (['media'])
        , newList
      if (selectedMedia.indexOf (payload) > -1)
        newList = selectedMedia.delete (selectedMedia.indexOf (payload))

      nextState = state.setIn (['media'], newList, val=>newList)
      return nextState
    }

    default: {
      return state
    }
  }
}
