import React, {Component} from 'react'
import { TouchableWithoutFeedback, Image, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { List } from '../components'
import { fetchPartsByManufacturer} from '../reducers/tuning/filterActions'
import { partsByManufacturerSelector, partsByManufacturerPaginationSelector } from '../selectors'
import { PostStyles } from '../styles'
import { addPart } from '../reducers/build/buildActions'

const mapStateToProps = (state, props) => {
	return {
		data: partsByManufacturerSelector (state, props),
		pagination: partsByManufacturerPaginationSelector (state, props),
	}	
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchData: (nextPageUrl) => {
			dispatch (fetchPartsByManufacturer (props.manufacturerId, nextPageUrl, props.specId, props.categoryName))
		},
		tagPart: (part) => {
			dispatch (addPart (part))
		}
	}
}

class Manufacturers extends Component {
	render () {
		return (<List contentMarginTop={80} showHeader {...this.props} renderRow={(rowData, rowId)=>{
			console.log (rowData, rowId)
			return (
					<TouchableWithoutFeedback onPress={()=>{
						this.props.tagPart (rowData)
						Actions.pop (2)}
					}>
	            <View style={{flex: 1,marginHorizontal: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
						<Image style={{width: 100, height: 100}} source={{uri: rowData.media}}/>
					<Text style={[PostStyles.primaryTitle]}>{rowData.name}</Text>
	            </View>
					</TouchableWithoutFeedback>
			)
		}}/>)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (Manufacturers)