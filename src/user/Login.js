'use strict'
import React, {Component} from 'react'
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import F8Colors from '../common/F8Colors'
import {LoginButton} from '../components'

import {PostStyles} from '../styles'
export default class LoginScreen extends Component {
  constructor (props) {
    super (props)
    this.state = {
      anim: new Animated.Value (0)
    }
  }

  componentDidMount () {
    Animated.timing (this.state.anim, {toValue: 3000, duration: 3000}).start()
  }

  render () {
    return (
      <Image
        style={styles.container}
        source={require('../common/img/login.png')}>
        <Animated.View style={[styles.section, this.fadeIn(700, -20)]}>
          <Text style={[styles.h1, PostStyles.infoContainer]}>RAAZ</Text>
          <LoginButton/>
        </Animated.View>
      </Image>
    );
  }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

}



const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(72 * scale),
    color: 'white',
    paddingVertical: 50,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.lightText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});
