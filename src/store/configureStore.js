'use strict'

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'

import createLogger from 'redux-logger'
import {createMiddleware} from 'redux-storage'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter'

import api from '../middlewares/api'
import reducer from '../reducers';

var promise = require ('./promise'),
    array = require ('./array')

const {
  ADD_TO_SAVED_SPECS,
  TOGGLE_SAVE_PRODUCT,
  SET_ACCESS_TOKEN,
  SET_ID_TOKEN,
  SET_REFRESH_TOKEN,  
} = require ('../constants').default

// sets up storage engine
export const asyncStorageEngine = filter (createEngine('viewed_listings'),[
                ['history', 'specs'],
                ['history', 'parts'],
                ['history', 'access_token'],
                ['history', 'id_token'],
                ['history', 'refresh_token']
                 ]),
             storageMiddleware = storage.createMiddleware (
                asyncStorageEngine, [],
                [ADD_TO_SAVED_SPECS, TOGGLE_SAVE_PRODUCT, SET_ACCESS_TOKEN, SET_ID_TOKEN, SET_REFRESH_TOKEN])

/* logger initialization */

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger ({
  predicate: (getState, action)=>isDebuggingInChrome,
  collapsed: true,
  duration: true
})

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  api,
  storageMiddleware,
  logger,
  promiseMiddleware (),
  // promise,
  array
)(createStore);

export function configureStore(initialState) {
  const store =  createStoreWithMiddleware(reducer, initialState)
  if (isDebuggingInChrome)
    window.store = store
  return store
};
