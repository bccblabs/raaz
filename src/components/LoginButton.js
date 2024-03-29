'use strict';

import React, {Component} from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import F8Button from '../common/F8Button'
const { loginAuth0 } = require('../reducers/user/userActions');
const { connect } = require('react-redux');
import { Styles } from '../styles'

class LoginButton extends Component {
  props: {
    style: any;
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <F8Button 
        type="error" 
        style={Styles.loginButton} 
        onPress={() => this.logIn()} 
        caption="Signup / Login "/>
    )
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});
    try {
      await Promise.race([
        loginAuth0(),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

module.exports = connect()(LoginButton)
