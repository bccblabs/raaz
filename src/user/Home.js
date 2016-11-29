'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import ProfileContainer from './ProfileContainer'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import {BuildsByUserId} from '../build'
import {PostsByUserId} from '../post'

import {General} from '../styles'
import {
	profileSelector,
	userIdSelector,
} from '../selectors'


const mapStateToProps = (state, props) => {
	return {
		profileData: profileSelector (state),
		userId: userIdSelector (state),
	}
}

class Home extends Component {
	render () {
	  	let {profileData, userId} = this.props
			, btnContent = (
	          <F8Button 
	            icon={require ('../common/img/car.png')} 
	            onPress={Actions.NewBuild}
	            style={{flex: -1}}            
	            type="search" caption="New Build"/>
			)

		return (
			<View style={{flex: 1,marginBottom: 50}}>
				<ProfileContainer
					initial={true}
					userId={userId}
					profileData={profileData}
					btnContent={btnContent}/>
			</View>
		)
	}
}

export default connect (mapStateToProps) (Home)
