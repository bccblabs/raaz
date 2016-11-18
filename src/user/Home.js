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
	postByUserIdSelector,
	postPaginationByUserIdSelector,

	buildByUserIdSelector,
	buildPaginationByUserIdSelector,

	profileSelector,
	userIdSelector,
} from '../selectors'

import {fetchPostsByUserId} from '../reducers/post/postActions'
import {fetchBuildsByUserId} from '../reducers/tuning/filterActions'

const mapStateToProps = (state, props) => {
	return {
		postData: postByUserIdSelector(state, props),
	    postPagination: postPaginationByUserIdSelector(state, props),

	    buildData: buildByUserIdSelector (state, props),
	    buildPagination: buildPaginationByUserIdSelector (state, props),

		profileData: profileSelector (state),
		userId: userIdSelector (state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPosts: (pageUrl) => {
      dispatch (fetchPostsByUserId (pageUrl, props.userId))
    },

    fetchBuilds: (pageUrl) => {
    	dispatch (fetchBuildsByUserId (pageUrl, props.userId))
    }
  }
}

class Home extends Component {
	render () {
	  	let {	
	  			postData, postPagination, fetchPosts,
	  			buildData, buildPagination, fetchBuilds,
	  			profileData, userId
	  		} = this.props
			, buildList = (<BuildsByUserId tabLabel="Builds" key="user-builds" data={buildData} pagination={buildPagination} userId={userId} fetchData={fetchBuilds}/>)
			, postList = (<PostsByUserId tabLabel="Posts" key="user-posts" data={postData} pagination={postPagination} userId={userId} fetchData={fetchPosts}/>)
			, btnContent = (
	          <View style={{
	          	flexDirection: 'row', justifyContent: 'space-between', flex: -1
	          }}>
		          <F8Button 
		            icon={require ('../common/img/car.png')} 
		            onPress={Actions.NewBuild}
		            style={{flex: 1}}            
		            type="search" caption="New Build"/>
		          <F8Button 
		            icon={require ('../common/img/comment.png')} 
		            onPress={Actions.NewPost}
		            type="search" 
		            style={{flex: 1}}            
		            caption="New Post"/>        
	          </View>
			)

		return (
			<ProfileContainer
				profileData={profileData}
				btnContent={btnContent}
				tabs={[buildList,postList]}
			/>
		)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (Home)
