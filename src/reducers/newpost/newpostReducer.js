'use strict'

const {
  ADD_TO_TAGGED_CARS,
  REMOVE_FROM_TAGGED_CARS,
  ADD_MEDIA,
  REMOVE_MEDIA,
} = require ('../../constants').default

const InitialState = require ('./newpostInitialState').default
const initialState = new InitialState

export default function NewPostReducer (state=initialState, action) {
 
  if (!(state instanceof InitialState)) return state.merge (initialState)

  let nextState

  switch (action.type) {

    case ADD_TO_TAGGED_CARS: {
      let {payload} = action
        , taggedCars = state.get ('taggedCars').set (payload.specId, payload)
      return state.setIn (['taggedCars'], taggedCars, val=> taggedCars)
    }

    case REMOVE_FROM_TAGGED_CARS: {
      let {payload} = action
        , taggedCars = state.get ('taggedCars').delete (payload)
      return state.setIn (['taggedCars'], taggedCars, val=> taggedCars)
    }

    case ADD_MEDIA: {
      let {payload} = action
        , selectedMedia = state.getIn (['selectedMedia'])
        , newList = selectedMedia.push (...payload)

      nextState = state.setIn (['selectedMedia'], newList, val=>newList)
      return nextState
    }

    case REMOVE_MEDIA: {
      let {payload} = action
        , selectedMedia = state.getIn (['selectedMedia'])
        , newList
      if (selectedMedia.indexOf (payload) > -1)
        newList = selectedMedia.delete (selectedMedia.indexOf (payload))

      nextState = state.setIn (['selectedMedia'], newList, val=>newList)
      return nextState
    }

    default: {
      return state
    }
  }
}
