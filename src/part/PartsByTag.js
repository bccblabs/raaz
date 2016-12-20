'use strict'

import {connect} from 'react-redux'

import {fetchPartsByTag} from '../reducers/tuning/filterActions'
import {partsByTagSelector, partsByTagPaginationSelector} from '../selectors'

import PartList from './PartList'

const mapStateToProps = (state, props) => {
	return {
		data: partsByTagSelector (state, props),
		pagination: partsByTagPaginationSelector (state, props),
		title: props.tag,
		specId: props.specId
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (nextPageUrl) => {
			dispatch (fetchPartsByTag (props.tag, props.specId, nextPageUrl))
		}
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (PartList)