'use strict'

import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { setModel } from '../reducers/car/filterActions'
import { ModelsList } from '../components'

const mapStateToProps = (state) => {
  return {
    selectedMake: state.car.selectedMake
  }
}

class PickModels extends Component {

  render () {
    let onSelectModel = (option) => {
      Actions.Submodels({build: this.props.build})
      this.props.dispatch (setModel (option))
    }
    return (<ModelsList 
              {...this.props} 
              selectedMake={this.props.selectedMake}
              onSelectModel={onSelectModel}
            />)
  }
}

export default connect (mapStateToProps) (PickModels)

