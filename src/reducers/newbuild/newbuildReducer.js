'use strict'

const {
	ADD_BUILD_MEDIA,
	REMOVE_BUILD_MEDIA,
	SET_PRIMARY_IMAGE,
	PICK_SUBMODEL,
	PICK_MAKE,
	PICK_MODEL,
	PICK_SPECID,
} = require ('../../constants').default

const InitialState = require ('./newbuildInitialState').default
const initialState = new InitialState

export default function NewBuildReducer (state=initialState, action) {

	if (!(state instanceof InitialState)) return state.merge (initialState)

	let nextState

	switch (action.type) {
	    
	    case PICK_MAKE: {
	      nextState = state
	      return nextState.setIn (['pickedMake'], action.payload, val=>action.payload)
	    }

	    case PICK_MODEL: {
	      nextState = state
	      return nextState.setIn (['pickedModel'], action.payload, val=>action.payload)
	    }

	    case PICK_SUBMODEL: {
	      nextState = state
	      return nextState.setIn (['pickedSubmodel'], action.payload, val=>action.payload)
	    }

	    case PICK_SPECID: {
	      return state.setIn (['pickedSpecId'], action.payload, val=>action.payload)
	    }

	    case ADD_BUILD_MEDIA: {
	      let {payload} = action
	        , selectedMedia = state.getIn (['selectedMedia'])
	        , newList = selectedMedia.push (...payload)

	      nextState = state.setIn (['selectedMedia'], newList, val=>newList)
	      					.setIn (['primaryImage'], newList.first(), val=>newList.first())
	      return nextState
	    }

	    case REMOVE_BUILD_MEDIA: {
	      let {payload} = action
	        , selectedMedia = state.getIn (['selectedMedia'])
	        , newList
	      if (selectedMedia.indexOf (payload) > -1)
	        newList = selectedMedia.delete (selectedMedia.indexOf (payload))

	      nextState = state.setIn (['selectedMedia'], newList, val=>newList)
	      return nextState
	    }

	    case SET_PRIMARY_IMAGE: {
	    	return state.setIn (['primaryImage'], action.payload, val=>action.payload)
	    }
	
	    default: {
	      return state
	    }
	}	
}