'use strict'

const {
  PICK_MAKE,
  PICK_MODEL,
  PICK_SUBMODEL,
  PICK_SPECID,

  ADD_BUILD_MEDIA,
  REMOVE_BUILD_MEDIA,
  SET_PRIMARY_IMAGE,

  SET_NAME,

  ADD_SPEC_ENTRY,
  SET_SPEC,
  EDIT_SPEC_ENTRY,
  REMOVE_SPEC_ENTRY,

  ADD_PART, 
  EDIT_PART,
  REMOVE_PART
} = require ('../../constants').default

import {Map} from 'immutable'
const InitialState = require ('./newbuildInitialState').default
const initialState = new InitialState

export default function NewBuildReducer (state=initialState, action) {

	if (!(state instanceof InitialState)) return state.merge (initialState)

	let nextState

	switch (action.type) {
	    
	    case PICK_MAKE: {
	      nextState = state
	      return nextState.setIn (['buildMake'], action.payload, val=>action.payload)
	    }

	    case PICK_MODEL: {
	      nextState = state
	      return nextState.setIn (['buildModel'], action.payload, val=>action.payload)
	    }

	    case PICK_SUBMODEL: {
	      nextState = state
	      return nextState.setIn (['buildSubmodel'], action.payload, val=>action.payload)
	    }

	    case PICK_SPECID: {
	      return state.setIn (['buildSpecId'], action.payload, val=>action.payload)
	    }

	    case ADD_BUILD_MEDIA: {
	      let {payload} = action
	        , selectedMedia = state.getIn (['buildMedia'])
	        , newList = buildMedia.push (...payload)

	      nextState = state.setIn (['buildMedia'], newList, val=>newList)
	      return nextState
	    }

	    case REMOVE_BUILD_MEDIA: {
	      let {payload} = action
	        , selectedMedia = state.getIn (['buildMedia'])
	        , newList
	      if (selectedMedia.indexOf (payload) > -1)
	        newList = selectedMedia.delete (selectedMedia.indexOf (payload))

	      nextState = state.setIn (['buildMedia'], newList, val=>newList)
	      return nextState
	    }

	    case SET_PRIMARY_IMAGE: {
	    	let {path, idx} = action.payload
	    		, media = state.getIn (['buildMedia'])
	    		, newList = media.slice (0, idx).concat (media.slice(idx+1)).insert (0, path)
	    	return state.setIn (['buildMedia'], newList, val=>newList)
	    }
	
		case SET_NAME: {
			return state.setIn (['buildName'], action.payload, val=>action.payload)
		}

		case ADD_SPEC_ENTRY: {
			let {name, value} = action.payload
			return state.setIn (['buildSpecs', name], value, val=>value)
		}		

		case EDIT_SPEC_ENTRY:  {
			let {name, value} = action.payload
			return state.setIn (['buildSpecs', name], value, val=>value)
		}

		case REMOVE_SPEC_ENTRY: {
			return state.deleteIn (['buildSpecs', action.payload])
		}

		case SET_SPEC: {
			let {specInfo} = action.payload
				, specMap = Map (specInfo).deleteIn (['specId'])
				, specs = state.getIn (['buildSpecs']).merge (specMap)
			return state.setIn (['buildSpecs'], specs, val=>specs)
		}

		case ADD_PART: {
			let {part} = action.payload
			return state.setIn (['buildParts', part.partId], part, val=>part)
		}

		case EDIT_PART: {
			let {part} = action.payload
			return state.setIn (['buildParts', part.partId], part, val=>part)
		}

		case REMOVE_PART: {
			return state.deleteIn (['buildParts', action.payload])
		}

	    default: {
	      return state
	    }
	}	
}