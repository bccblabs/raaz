'use strict'
import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native'

import {Heading3, Paragraph} from '../common/F8Text'
import {Actions} from 'react-native-router-flux'

import {PartStyles, Titles, DetailStyles} from '../styles'
import {Requests} from '../utils'
import {LoadingView, ErrorView} from './'


export default class Manufacturers extends Component {
  constructor (props) {
    super (props)
    this.state = {
      isFetching: true,
      hasError: false,
      data: {}
    }
    this.fetchPartsByManufacturer = this.fetchPartsByManufacturer.bind (this)
  }

  componentWillMount () {
    this.fetchPartsByManufacturer ()
  }

  async fetchPartsByManufacturer () {
    try {
      let {specId, manufacturerId} = this.props
        , data = await Requests.fetchPartsByManufacturer (specId, manufacturerId)

      console.log (data)
      this.setState ({
        hasError: false,
        isFetching: false,
        data: data
      })
    } catch (err) {
      console.log (err)
      this.setState ({hasError: true, isLoading: false})
    }
  }

  render() {
    let {specId} = this.props
      , {data, isFetching, hasError} = this.state
      , {tuning} = data
      , content
    if (isFetching) {
      content =  (<LoadingView/>)
    }
    else if (hasError) {
      content = (<ErrorView/>)
    } 
    else {
      content = (
        <View>
          {tuning.map ((optionRow, idx)=>{
            return (
              <View style={{backgroundColor: 'white'}} key={`pg-${idx}`}>
              <Paragraph style={PartStyles.partSectionTitle}>
              {optionRow.name.toUpperCase()}
              </Paragraph>
              <ScrollView
              style={{marginTop: 8, height: 200}}
              containerStyle={{height: 200}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
                {
                  optionRow.data.map ((data, cidx)=> {
                    let {name, media, partId} = data,
                        passProps = Object.assign ({}, {partId}, {name}, {specId})

                    return (
                      <TouchableWithoutFeedback style={{margin: 16}} key={`pelem-${cidx}`} onPress={()=>{Actions.PartDetails ({...passProps})}}>
                      <View style={{flex: 1}}>
                        <Image
                          source={{uri: media}}
                          style={DetailStyles.scrollImage, {height: 200, width: 200, margin: 16}}>
                        </Image>
                        <Text style={{fontSize: 12, fontWeight: '700', color: 'black', position: 'absolute', top: 8, left: 8, maxWidth: 150, flex: -1}}>{name}</Text>
                        </View>
                      </TouchableWithoutFeedback>
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

      return (
        <View style={{backgroundColor: 'white', flex: 1, alignItems: 'flex-start', marginVertical: 16}}>
          {content}
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