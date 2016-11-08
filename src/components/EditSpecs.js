'use strict'

import React, {Component} from 'react'
import {View, TextInput, TouchableWithoutFeedback} from 'react-native'
import {Actions} from 'react-native-router-flux'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading3} from '../common/F8Text'
const dismissKeyboard = require('dismissKeyboard')

import {General, Titles, NewPostStyles} from '../styles'
export default class EditSpecs extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			value: props.value,
		}
	}
	render () {
		let {onDoneEdit, newEntry} = this.props
		,	{name, value} = this.state
		,	header = (
			<F8Header 
				foreground="dark" 
				leftItem={{
					icon:require ('../common/img/back.ios.png'), 
					onPress: Actions.pop
				}} 
				title="Edit Specs"/>
		)
		return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
			<View style={{flex: 1}}>
			{header}
			<View style={{flexDirection: 'row', flex: 1}}>
		      <TextInput
		        placeholder={newEntry?'Specs Name':name.toUpperCase()}
		        multiline={true}
		        maxLength={40}
		        returnKeyType='done'
		        editable={newEntry?true:false}
		        onChangeText={(text) => {
		          this.setState({name: text});
		        }}
		        placeholderTextColor={newEntry?'gray':'black'}
		        style={{fontSize: 16, flex: 1, margin: 16}}/>
		      <TextInput
		        placeholder={newEntry?'Specs Value':value.toString()}
		        multiline={true}
		        maxLength={140}
		        keyboardType='number-pad'
		        returnKeyType='done'
		       onChangeText={(text) => {
		          this.setState({value: parseInt(text)});
		        }}
		        style={{fontSize: 16, flex: 1, margin: 16}}/>
	        </View>
	        <F8Button
	          style={[General.bottomButtonStyle, {backgroundColor: 'red', position: 'absolute', bottom: 0}]}
	          type="saved" caption="Done!"
	          onPress={()=>{
	          	console.log (this.state)
	          	onDoneEdit(this.state.name, parseInt (this.state.value))
	          	Actions.pop()
	          }}
	        />
			</View>
      </TouchableWithoutFeedback>
		)
	}
}