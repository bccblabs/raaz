'use strict'
import React, {Component} from 'react'
import keys from 'lodash/keys'
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class PartTags extends Component {
	render () {
		let {tags, buildId, specId} = this.props
		   return (tags && keys(tags).length) ? (
		    <View flexDirection="row" justifyContent="center" alignItems="center">
				<Text style={{fontWeight:'bold', color: 'black', fontSize: 10, marginHorizontal: 8}}>{"Tuned:"}</Text>
			    <ScrollView contentContainerStyle={{
			        backgroundColor: 'white', 
			        flexDirection: 'row',
			        alignItems: 'center',
			        flex: 1,
			      }}>
			      {keys(tags).map((partTag, idx)=>{
			        return (
			        <TouchableWithoutFeedback key={`pt-${buildId}-${idx}`} onPress={()=>Actions.PartsByBuild({buildId: buildId, tag: partTag, specId: specId})}>
			          <View key={`psp-${idx}`} style={{
			            flexDirection: 'row', 
			            justifyContent: 'center',
			            alignItems: 'center',
			            flex: -1, 
			            backgroundColor: 'orange',
			            borderRadius: 4, 
			            margin: 4,}}>
			          <Text style={{fontSize: 10,color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{tags[partTag]}</Text>
			          <Text style={{fontSize: 10, margin: 4, color: 'white', fontWeight: 'bold'}}>{`#${partTag}`}</Text>
			          </View>
			        </TouchableWithoutFeedback>
			        )})
			      }
				</ScrollView>
			</View>
    		) : (<View/>)
	}
}
