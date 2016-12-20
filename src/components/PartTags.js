'use strict'
import React, {Component} from 'react'
import keys from 'lodash/keys'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class PartTags extends Component {
	render () {
		let {tags, buildId, specId} = this.props
		   return (tags && keys(tags).length) ? (
		    <View 
		    	style={{
		    		alignItems: 'center', 
		    		justifyContent: 'center', 
		    		flex: -1,  
		    		marginVertical: 16, 
		    		flexWrap: 'wrap', 
		    		flexDirection: 'row'
		    	}}>
			      {keys(tags).map((partTag, idx)=>{
			        return (
			        <TouchableWithoutFeedback key={`pt-${buildId}-${idx}`} onPress={()=>Actions.PartsByBuild({buildId: buildId, tag: partTag, specId: specId})}>
			          <View key={`psp-${idx}`} style={{
			            flexDirection: 'row', 
			            maxHeight: 20,
			            justifyContent: 'center',
			            alignItems: 'center',
			            flex: -1,
			            margin: 4,}}>
			          <Text style={{fontSize: 16, margin: 6, color: 'black', fontWeight: 'bold'}}>{`#${partTag}`}</Text>
			          </View>
			        </TouchableWithoutFeedback>
			        )})
		      }
			</View>
		) : (<View/>)
	}
}

