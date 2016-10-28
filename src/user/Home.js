'use strict'

import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import ProfileContainer from './ProfileContainer'
import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {PostList} from '../post'

import {
	homePostSelector,
	homePostPaginationSelector,
	profileSelector,
	userIdSelector
} from '../selectors'

import {fetchPosts} from '../reducers/post/postActions'

const mapStateToProps = (state, props) => {
	return {
		data: homePostSelector(state),
    pagination: homePostPaginationSelector(state),
		profileData: profileSelector (state),
		userId: userIdSelector (state),
	}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {
      dispatch (fetchPosts (pageUrl, props.userId))
    }
  }
}

class Home extends Component {
	render () {
	  	let {data, pagination, profileData, fetchTags, fetchData, tags, userId} = this.props

			, leftItem = userId?{title:'My Builds', onPress: Actions.MyBuilds}:null
			, rightItem = userId?{title: 'Settings', onPress: Actions.Settings}:null

			, header = (<F8Header foreground="dark" leftItem={leftItem} rightItem={rightItem}/>)
			,	list = (<PostList key="home-posts" data={data} pagination={pagination} userId={userId} tags={tags} fetchTags={fetchTags} fetchData={fetchData} />)
		  , btn = (<F8Button type="tertiary" caption="Add New Build" icon={require ('../common/img/tuning.png')}/>)

		return (
			<ProfileContainer
				profileData={profileData}
				listContent={list}
				btnContent={btn}
				headerContent={header}
				/>)
		}
}

export default connect (mapStateToProps, mapDispatchToProps) (Home)
