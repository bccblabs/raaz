'use strict'

import {connect} from 'react-redux'

import {fetchPartsByBuildId} from '../reducers/tuning/filterActions'
import {partsByBuildIdSelector, partsByBuildIdPaginationSelector} from '../selectors'

import PartList from './PartList'

const mapStateToProps = (state, props) => {
	return {
		data: partsByBuildIdSelector (state, props),
		pagination: partsByBuildIdPaginationSelector (state, props),
		title: props.tag,
		specId: props.specId
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (nextPageUrl) => {
			dispatch (fetchPartsByBuildId (props.buildId, nextPageUrl, props.tag))
		}
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (PartList)