'use strict'

import React, {Component} from 'react'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {List} from './'
import {specsByManufacturerIdSelector, specsPaginationByManufacturerIdSelector} from '../selectors'
import {fetchSpecsByManufacturer} from '../reducers/tuning/filterActions'
import {setSpecId} from '../reducers/car/filterActions'

const mapStateToProps = (state, props) => {
	return {
		data: specsByManufacturerIdSelector (state, props),
		pagination: specsPaginationByManufacturerIdSelector (state, props)
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (pageUrl) => { dispatch (fetchSpecsByManufacturer (props.manufacturerId, pageUrl))},
		setSpecId: (specId) => {dispatch (setSpecId (specId))}
	}
}


class SpecsByManufacturer extends Component {
	render () {
	    return (<List {...this.props} renderRow={(data, rowId)=>{

	    	let {make, model, submodel, specs, year} = data
	    		, {specId, horsepower} = specs
	    		, {setSpecId} = this.props

	    	return (
	    		<TouchableWithoutFeedback onPress={()=>{
	    			setSpecId (specId)
	    			Actions.pop()
	    		}}>
	    		<View>
		    		<Text>{`${make} ${model} ${submodel} - ${horsepower}`}</Text>
		    		<View style={{flexDirection: 'row'}}>
		    		{year.map ((yr, idx) => (<Text key={`yr-${idx}`}>{yr}</Text>))}
		    		</View>
	    		</View>
	    		</TouchableWithoutFeedback>
	    	)
	    }}/>)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (SpecsByManufacturer)