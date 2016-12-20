'use strict'
import React, {Component} from 'react'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {tagsPaginationBySpecIdSelector, tagsBySpecIdSelector} from '../selectors'
import {fetchTuningTags} from '../reducers/tuning/filterActions'

import {
	ErrorView,
	LoadingView,
} from './'

const mapStateToProps = (state, props) => {
	return {
		tags: tagsBySpecIdSelector (state, props),
		pagination: tagsPaginationBySpecIdSelector (state, props)
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchTags: (nextPageUrl) => {dispatch (fetchTuningTags (props.specId, nextPageUrl))}
	}
}

class TuningTags extends Component {

	componentWillMount () {
		this.props.fetchTags ()
	}

	render () {
		let {tags, specId, pagination} = this.props
		if (pagination.isFetching) return (<LoadingView/>)
		else if (pagination.hasError) return (<ErrorView/>)
		else {			
		   return (tags && tags.length) ? (
		    <View style={{margin: 16,justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
		      {tags.map((partTag, idx)=>{
		        return (
		        <TouchableWithoutFeedback 
		        	key={`pt-${specId}-${idx}`} 
		        	onPress={()=>Actions.PartsByTag ({tag: partTag, specId: specId})}>
			          <View key={`psp-${idx}`} style={{
			            flexDirection: 'row', 
			            maxHeight: 20,
			            justifyContent: 'center',
			            alignItems: 'center',
			            flex: -1,
			            margin: 4,}}>
			          <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold'}}>{`#${partTag}`}</Text>
			          </View>
		        </TouchableWithoutFeedback>
		        )})
		      }
			</View>
		) : (<View/>)
		}
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningTags)