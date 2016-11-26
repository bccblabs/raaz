'use strict'

import React, {Component} from 'react'
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

import {Specs, GraphColorsArray} from '../styles'
import numeral from 'numeral'
import keys from 'lodash/keys'

import {Actions} from 'react-native-router-flux'
import {Utils} from '../utils'
import {Heading3} from '../common/F8Text'


const window = Dimensions.get ('window')
const maxWidth = 280
const scalars = {
  'displacement': 1/20,
  'horsepower': 1/2.5,
  'torque': 1/2.5,
  'max_hp_rpm': 1/20,
  'max_tq_rpm': 1/20,
  'compressionRatio': maxWidth/20,
  'cylinders': 20,
  'cargo_capacity': 10,
  'wheel_base': 2,
  'turning_diameter':10,
  'zero_sixty': 50,
  'ground_clearance': 20,
  'curb_weight': 1/20,
  'drag': 100,
  'fuel': 10,
  'tqGain': 3,
  'hpGain': 3,
  'maxHp': 1/2,
  'maxTq': 1/2,
  'labor': 1,
  'size': 20,
  'weight': 10,
  'rearLowering': 20,
  'frontLowering': 20,
  'rearSpringRateStiffness': 20,
  'frontSpringRateStiffness': 20
}

export default class MetricsGraph extends Component {
  constructor (...args) {
    super (...args)

    this.getWidth = this.getWidth.bind (this)

    let entries = this.props.data[0]
      , firstPageData = this.getWidth (entries)

    this.state = {
      currentIndex: 0,
      entriesOnDisplay: firstPageData,
      data: Object.assign (...this.props.data[0].entries.map ((item=>({[item['name']]:item['value']} ))) )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState ({
      currentIndex: 0,
      entriesOnDisplay: this.getWidth (nextProps.data[0]),
      data: Object.assign (...nextProps.data[0].entries.map ((item=>({[item['name']]:item['value']} ))) )

    })
  }

  getWidth (data) {
    let entryWidth = {}, widthCap
    for (let i = 0; i < data.entries.length; i++) {
      let entryName = data.entries[i].name
      let entryValue = data.entries[i].value
      widthCap = scalars[entryName]?entryValue * scalars[entryName]:entryValue
      if (entryValue)
        entryWidth [entryName] = Math.abs( (widthCap <= maxWidth) ? widthCap:(maxWidth-50))
    }
    return entryWidth
  }

  handleAnimation (idx) {
    let currentDataWidth = this.getWidth (this.props.data[idx]),
          {val0, val1} = this.state,
          timing = Animated.timing,
          valuesMap = {}

    Animated.parallel ([val0, val1].map ((item, idx)=>{
      return timing (this.state[`val${idx}`], {toValue: currentDataWidth[`val${idx}`]})
    })).start ()
    this.setState ({currentIndex: idx})
  }

  render () {
    let {currentIndex, entriesOnDisplay, data} = this.state
      , {onDoneEdit} = this.props
    return (
          <View>
          {
            entriesOnDisplay && keys (entriesOnDisplay).map ((entryKey, idx)=>{
              let dataEntry = entriesOnDisplay[entryKey]
                , labelName = Utils.parseLabelName (entryKey)
                , labelValue = numeral(data[entryKey]).format('0,0')
            return (
              <View style={Specs.item} key={idx}>
                <Heading3 style={Specs.subtitle}>{labelName}</Heading3>
                <View style={Specs.data}>
                  {
                    this.props.editable?
                    (<TouchableWithoutFeedback onPress={()=>{
                        Actions.EditSpecs({
                          onDoneEdit: onDoneEdit,
                          name: entryKey,
                          value: data[entryKey],
                        })
                      }}>
                      <Image style={{margin: 4}} source={require('../common/img/ic_build.png')}/>
                    </TouchableWithoutFeedback>):(<View/>)
                  }
                  <Animated.View style={[Specs.bar, GraphColorsArray[idx%GraphColorsArray.length], {width: dataEntry}]}/>
                  <Heading3 style={Specs.subtitle}>{labelValue}</Heading3>
                </View>
              </View>
              )
            })
          }
          </View>
    )
  }
}
