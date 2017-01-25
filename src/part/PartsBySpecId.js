'use strict'

import {connect} from 'react-redux'

import {fetchParts} from '../reducers/tuning/filterActions'
import {partsBySpecIdSelector, partsPaginationSelector} from '../selectors'

import PartList from './PartList'

const mapStateToProps = (state, props) => {
	return {
		data: partsBySpecIdSelector (state, props),
		pagination: partsPaginationSelector (state, props),
		specId: props.specId,
		showHeader: false,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (nextPageUrl) => {
			dispatch (fetchParts (nextPageUrl, props.specId))
		}
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (PartList)