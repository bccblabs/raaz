'use strict'

import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { setMake } from '../reducers/car/filterActions'
import { MakesList } from '../components'

class PickMakes extends Component {
  render () {
    let onSelectMake = (option) =>{
      Actions.Models({build: this.props.build})      
      this.props.dispatch (setMake (option))
    }
    return (<MakesList  {...this.props} onSelectMake={onSelectMake}/>)
  }
}

export default connect () (PickMakes)
