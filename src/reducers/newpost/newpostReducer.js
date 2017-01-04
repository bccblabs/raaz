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

    case SET_UPLOAD_PROG: {
      let {payload} = action
      return state.setIn (['uploadProgress'], payload * 0.95, val => payload * 0.95)
                  .setIn (['isUploading'], true, val=>true)
    }

    case `${UPLOAD_S3}_REJECTED`: {
      return state.setIn (['hasError'], true, val=>true)
    }

    case `${CREATE_POST}_FULFILLED`: {
      return state.setIn (['hasError'], false, val=>false)
                  .setIn (['isUploading'], false, val=>false)
                  .setIn (['uploadProgress'], 1, val=>1)
    }
    case `${CREATE_POST}_REJECTED`: {
      return state.setIn (['hasError'], true, val=>true)
                  .setIn (['isUploading'], true, val=>true)
                  .setIn (['uploadProgress'], 1, val=>1)
    }

    default: {
      return state
    }
  }
}
