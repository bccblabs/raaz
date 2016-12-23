'use strict'
import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Image} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {isPartSavedSelector} from '../selectors'
import {toggleSaveProduct} from '../reducers/history/historyActions'
import {General} from '../styles'
const mapStateToProps = (state, props) => {
  return {
    isSaved: isPartSavedSelector (state, props),
    part: props.part,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSaveProduct: (part) => {dispatch (toggleSaveProduct (part))}
  }
}

class SaveProductButton extends Component {
  render () {
    let {isSaved, part, toggleSaveProduct} = this.props
      , iconSrc = isSaved? require ('../common/img/heart.png'):require ('../common/img/heart_blank.png')
      return (
      <TouchableWithoutFeedback onPress={()=>toggleSaveProduct (part)}>
        <View style={{backgroundColor: 'transparent', position: 'absolute', top: 24, right: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Image source={iconSrc} style={{flex: -1}}/>
        </View>
      </TouchableWithoutFeedback>
      )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (SaveProductButton)
