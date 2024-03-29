'use strict'
import React, {Component} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import FilterCard from './FilterCard'
import {Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {
  toggleTuningTags,
} from '../reducers/tuning/filterActions'

import isArray from 'lodash/isArray'
import {Titles} from '../styles'

class TagFilter extends Component {
  constructor (props) {
    super (props)
  }

  render() {
    let {data, onPress, selectedTags, isTuning} = this.props
    if (!data) return (<View><Text style={{color: 'black'}}>{"Email Us For More..."}</Text></View>)
    else {
    return (
      <View style={isTuning?[styles.container, {marginBottom: 16}]:styles.container}>
        <View>
        {data.map ((optionRow, idx)=>{
          return (
            <View style={{backgroundColor: 'white'}} key={`tf-${idx}`}>
            <Paragraph style={Titles.filterSectionTitle}>
            {optionRow.name.toUpperCase()}
            </Paragraph>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {
                optionRow.options.map ((filterChoice, idx)=> {
                  let isFilterSelected = (selectedTags.indexOf (filterChoice.name) > -1)
                  return (
                      <FilterCard
                        touchEnabled={true}
                        selected={isFilterSelected}
                        key={idx}
                        action={onPress(filterChoice.name)}
                        {...filterChoice}
                      />
                  )
                })
              }
            </ScrollView>
            </View>
          )
        })}
        </View>
      </View>
    )
  }
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  },
});

export default connect () (TagFilter)
