'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import {
	buildSpecId, 
	buildName, 
	buildId, 

	buildMedia, 
	buildParts,
	buildSpecs,
} from '../selectors'

import {
	addMedia, 
	removeMedia, 
	setPrimaryImage,

	createBuild, 
} from '../reducers/newbuild/newbuildActions'

const mapStateToProps = (state) => {
	return {
		buildSpecId: buildSpecId (state),
		
		buildYear: buildYear (state),
		buildName: buildName (state),
		buildId: buildId (state),

		buildMedia: buildMedia (state),
		buildParts: buildParts (state),

		specEntries: specEntries (state),

		parts: partEntries (state),
		removePart: removePart ()
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMedia: (mediaList) => dispatch (addMedia (mediaList)),
		removeMedia: (path) => dispatch (removeMedia (path)),
		setPrimaryImage: (path) => dispatch (setPrimaryImage (path)),

		addSpecEntry: (name, value) => dispatch (addSpecEntry (name, value)),
		removeSpecEntry: (name, value) => dispatch (removeSpecEntry (name, value)),

		addPartByPartId: (partId) => dispatch (addPartByPartId (partId)),
		addPart (part) => ()
	}
}

class NewBuild extends Component {

	constructor (props) {
		super (props)
		this.createBuild = this.createBuild.bind (this)
	}

	async createBuild () {

	}
	render() {
		
		return (<View/>)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (NewBuild)
