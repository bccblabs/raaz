'use strict'

import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import {buildSpecId, buildYear, buildName, buildId, buildMedia, buildParts} from '../selectors'
import {addMedia, removeMedia, setPrimaryImage} from '../reducers/newbuild/newbuildActions'

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
	render() {
		
		return (<View/>)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (NewBuild)
