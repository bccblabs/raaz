'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import ProfileContainer from './ProfileContainer'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import {PostsByUserId} from '../post'
import {General} from '../styles'
import {profileSelector, userIdSelector} from '../selectors'

const mapStateToProps = (state, props) => {
	return {
		profileData: profileSelector (state),
		userId: userIdSelector (state),
	}
}

class Home extends Component {
	render () {
	  	let {profileData, userId} = this.props
		return (
			<ProfileContainer
				currUser
				userId={userId}
				profileData={profileData}/>
		)
	}
}

export default connect (mapStateToProps) (Home)
