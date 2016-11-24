'use strict'
import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'

import {Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'

import {PartStyles} from '../styles'

export default class Manufacturers extends Component {
  constructor (props) {
    super (props)
  }

  render() {
    let {data, onPress, specId} = this.props
    return (
      <View style={{backgroundColor: 'white'}}>
        {data.map ((optionRow, idx)=>{
          return (
            <View style={{backgroundColor: 'white'}} key={`pg-${idx}`}>
            <Paragraph style={PartStyles.partSectionTitle}>
            {optionRow.name.toUpperCase()}
            </Paragraph>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={PartStyles.partsScrollStyle}>
              {
                optionRow.data.map ((data, cidx)=> {
                  let {name, logo, manufacturerId} = data,
                      passProps = Object.assign ({}, {manufacturerId}, {name}, {specId}, {categoryName: optionRow.name})

                  return (
                    <View key={`pelem-${cidx}`}  style={PartStyles.partContainer}>
                    <TouchableWithoutFeedback  onPress={()=>{Actions.PartsByManufacturer ({...passProps})}}>
                      <Image
                        source={{uri: logo}}
                        style={PartStyles.partImage}>
                      </Image>
                    </TouchableWithoutFeedback>
                    </View>
                  )
                })
              }
            </ScrollView>
            </View>
          )
        })}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

