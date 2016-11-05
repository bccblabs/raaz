'use strict'
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
} = require ('../../constants').default

const InitialState = require ('./partInitialState').default
const initialState = new InitialState

export default function PartReducer (state=initialState, action) {
	if (!(state instanceof InitialState)) return state.merge (initialState)
	let nextState
	return state
}