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

import {NewPostButton} from '../components'

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
	            onPress={()=>Actions.BuildsByUserId ({userId})}
	            style={{flex: -1}}            
	            type="search" caption="My Builds"/>
			)

		return (
			<View style={{flex: 1}}>
				<ProfileContainer
					userId={userId}
					profileData={profileData}
					btnContent={btnContent}/>
		        <View style={{backgroundColor: 'transparent',flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'slategray', justifyContent: 'space-between', flex: -1}}>
					<F8Button style={{flex: 1}}
						onPress={()=>Actions.NewPost()}
						type="search"
						icon={require ('../common/img/camera.png')}
						caption={"New Post"}/>
		        </View>
			</View>
		)
	}
}

export default connect (mapStateToProps) (Home)
