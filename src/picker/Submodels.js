'use strict'

import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { setSubmodel } from '../reducers/car/filterActions'
import {SubmodelsList} from '../components'

const mapStateToProps = (state) => {
  return {
    selectedMake: state.car.selectedMake,
    selectedModel: state.car.selectedModel,
  }
}

class PickSubmodels extends Component {

  render () {
    let onSelectSubModel = (option) => {
      Actions.Specs({build: this.props.build})
      this.props.dispatch (setSubmodel (option))
    }
    return (<SubmodelsList 
              {...this.props} 
              selectedMake={this.props.selectedMake}
              onSelectSubModel={onSelectSubModel}
            />)
  }
}

export default connect (mapStateToProps) (PickSubmodels)

