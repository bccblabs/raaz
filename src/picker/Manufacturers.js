import React, {Component} from 'react'
import {TouchableWithoutFeedback, Image, View, Text} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { List } from '../components'
import { manufacturersPaginationBySpecIdSelector, manufacturersBySpecIdSelector } from '../selectors'
import { fetchManufacturersBySpecId } from '../reducers/tuning/filterActions'
import { PostStyles } from '../styles'
const mapStateToProps = (state, props) => {
	return {
		data: manufacturersBySpecIdSelector (state, props),
		pagination: manufacturersPaginationBySpecIdSelector (state, props),
		title: 'Manufacturers',
		specId: props.specId,
	}	
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (nextPageUrl) => {
			dispatch (fetchManufacturersBySpecId(props.specId))
		}
	}
}

class Manufacturers extends Component {
	render () {
		return (<List contentMarginTop={80} showHeader {...this.props} renderRow={(rowData, rowId)=>{
			console.log (rowData, rowId)
			return (
					<TouchableWithoutFeedback onPress={()=>Actions.PartSelector ({manufacturerId: rowData.manufacturerId, specId: this.props.specId})}>
	            <View style={{flex: 1,marginHorizontal: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
						<Image style={{width: 100, height: 100}} source={{uri: rowData.logo}}/>
					<Text style={[PostStyles.primaryTitle]}>{rowData.name}</Text>
	            </View>
					</TouchableWithoutFeedback>
			)
		}}/>)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (Manufacturers)