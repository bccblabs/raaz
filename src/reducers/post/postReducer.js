'use strict'

const {
  LIKE_USER_POST,
  VIEW_USER_POST,
} = require ('../../constants').default

const InitialState = require ('./postInitialState').default,
      initialState = new InitialState

export default function postReducer (state=initialState, action) {
  if (!(state instanceof InitialState)) return state.merge (initialState)
  switch (action.type) {
    default: {
      return state
    }
  }
}
