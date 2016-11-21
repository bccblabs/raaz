'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import ProfileContainer from './ProfileContainer'
import {BuildsPager} from '../build'
import {PostsByUserId} from '../post'
import {Requests} from '../utils'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {General} from '../styles'
import {LoadingView, ErrorView} from '../components'

export default class UserPage extends Component {
	constructor (props) {
		super (props)
		this.state = {
			hasError: false,
			isLoading: true,
			data: {}
		}
		this.fetchUserDetails = this.fetchUserDetails.bind (this)
	}

	async fetchUserDetails () {
		try {
			let {userId} = this.props
				, data = await Requests.fetchUserDetails (userId)
			console.log ({data})
			this.setState ({
				hasError: false,
				isLoading: false,
				data: data
			})
		} catch (err) {
			console.log (err)
			this.setState ({hasError: true, isLoading: false})
		}
	}

	componentWillMount () {
		this.fetchUserDetails ()
	}

	render () {
	  	let {userId} = this.props
	  		, {data, isLoading, hasError} = this.state
		    , leftItem = {
		      icon: require ('../common/img/back.ios.png'),
		      onPress: Actions.pop
		    }
		    , header = (
		      <F8Header
		        foreground="dark"
		        leftItem={leftItem}
		        style={General.headerStyle}/>
		    )
			, btnContent = (
	          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: -1}}>
				<F8Button 
					onPress={Actions.NewBuild}
					style={{flex: 1}}            
					type="search" caption="Follow"/>
				<F8Button 
					onPress={Actions.NewPost}
					type="search" 
					style={{flex: 1}}            
					caption="Message"/>        
	          </View>
			)

	    if (isLoading) {
			return (<View style={{flex: 1}}>{header}<LoadingView/></View>)
	    }
	    else if (hasError) {
			return (<View style={{flex: 1}}>{header}<ErrorView/></View>)
	    } 
	    else {
			return (
				<ProfileContainer
					profileData={data}
					btnContent={btnContent}
					userId={userId}
				/>
			)
	    }
	}
}
