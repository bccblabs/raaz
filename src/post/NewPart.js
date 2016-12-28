'use strict'
import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

class NewPart extends Component {
	render () {
		return (<View/>)
	}
}

export default connect () (NewPart)