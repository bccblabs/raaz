'use strict'

import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { addSpecToHistory } from '../reducers/history/historyActions'
import { setSpecId } from '../reducers/car/filterActions'
import { SpecsList } from '../components'

const mapStateToProps = (state) => {
  return {
    selectedMake: state.car.selectedMake,
    selectedModel: state.car.selectedModel,
    selectedSubmodel: state.car.selectedSubmodel,
    userId: state.user.profileData.user_id,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedSpecId: (specId) => {
      dispatch (setSpecId (specId))
    },
    addSpecToHistory: (selectedMake, selectedModel, selectedSubmodel, specId) => {
      dispatch (addSpecToHistory (selectedMake, selectedModel, selectedSubmodel, specId))
    }
  }
}


class PickSpecs extends Component {

  render () {
    let {selectedMake, selectedModel, selectedSubmodel, userId, build} = this.props
      , onSelectSpec

    if (build) {
      onSelectSpec = (option, buildId) => {
        Actions.pop ()
      }
    } else {
      onSelectSpec = (option, specId) => {
        Actions.TuningBySpec ({specId})
        this.props.dispatch (addSpecToHistory (selectedMake, selectedModel, selectedSubmodel, option))
        this.props.dispatch (setSpecId (specId))
      }
    }
    return (<SpecsList 
              {...this.props} 
              selectedMake={this.props.selectedMake}
              onSelectSpec={onSelectSpec}
            />)
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PickSpecs)

