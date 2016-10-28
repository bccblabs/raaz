'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider, connect } from 'react-redux'

import { loadHisory } from './reducers/history/historyActions'
import { asyncStorageEngine, configureStore } from './store/configureStore'
import * as storage from 'redux-storage'
import {LoadingView} from './components'
import scenes from './scenes'

import historyInitialState from './reducers/history/historyInitialState'
import carFilterInitialState from './reducers/car/filterInitialState'
import tuningFilterInitialState from './reducers/tuning/filterInitialState'
import userInitialState from './reducers/user/userInitialState'
import postInitialState from './reducers/post/postInitialState'
import newpostInitialState from './reducers/newpost/newpostInitialState'

import { Router, Scene} from 'react-native-router-flux'

import codePush from 'react-native-code-push'

const RouterWithRedux = connect () (Router)

function getInitialState () {
  const _initState = {
    history: new historyInitialState,
    car: new carFilterInitialState,
    tuning: new tuningFilterInitialState,
    user: new userInitialState,
    post: new postInitialState,
    newpost: new newpostInitialState,
  }
  return _initState
}

let setup = () => {
  class Root extends Component {
    constructor (props) {
      super(props)
      const load = storage.createLoader(asyncStorageEngine),
            store = configureStore(getInitialState())
      load(store)
          .then((history) => {
            store.dispatch (loadHisory (history))
            this.setState ({isLoading: false})
          })
      this.state = {
        isLoading: true,
        store: store
      }
    }

    render () {
      return this.state.isLoading
      ? (<LoadingView/>)
      : (
        <Provider store={this.state.store}>
          <RouterWithRedux scenes={scenes}>
          </RouterWithRedux>
        </Provider>
      )
    }
  }
  return codePush (Root)
}

module.exports = setup
