'use strict'
import React, {Component} from 'react'
import keys from 'lodash/keys'
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {WIDTH} from '../styles'
export default class PartTags extends Component {
	render () {
		let {tags, buildId, specId} = this.props
		   return (tags && keys(tags).length) ? (
		    <ScrollView 
			    style={{flex: 1,  marginVertical: 0}}
			    horizontal={true}
			    showsHorizontalScrollIndicator={false}
			    showsVerticalScrollIndicator={false}

			    contentContainerStyle={{
			        backgroundColor: 'transparent', 
			        flexDirection: 'row',
			        alignItems: 'center',
			      }}
					automaticallyAdjustContentInsets={false}
			      >
			      {keys(tags).map((partTag, idx)=>{
			        return (
			        <TouchableWithoutFeedback key={`pt-${buildId}-${idx}`} onPress={()=>Actions.PartsByBuild({buildId: buildId, tag: partTag, specId: specId})}>
			          <View key={`psp-${idx}`} style={{
			            flexDirection: 'row', 
			            justifyContent: 'center',
			            alignItems: 'center',
			            flex: -1, 
			            backgroundColor: 'red',
			            borderRadius: 4, 
			            margin: 4,}}>
			          <Text style={{fontSize: 10, margin: 4, color: 'white', fontWeight: 'bold'}}>{`#${partTag}`}</Text>
			          </View>
			        </TouchableWithoutFeedback>
			        )})
			      }
				</ScrollView>
    		) : (<View/>)
	}
}
