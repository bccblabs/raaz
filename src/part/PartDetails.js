'use strict'

import React, {Component} from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {Requests} from '../utils'

import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {Heading3, Paragraph} from '../common/F8Text'

import {LoadingView, ErrorView, MetricsGraph, SaveProductButton} from '../components'

import {General, Titles, DetailStyles, PostStyles, Specs} from '../styles'


export default class PartDetails extends Component {
  constructor (props) {
    super (props)
    this.state = {
      hasError: false,
      isLoading: true
    }

    this.fetchPartDetails = this.fetchPartDetails.bind (this)
  }

  async fetchPartDetails () {
    try {
      let {partId, specId} = this.props.data
        , data = await Requests.fetchPartDetails (partId, specId)
      this.setState ({
        hasError: false,
        isLoading: false,
        data: data,
      })

    } catch (err) {
      this.setState ({hasError: true, isLoading: false})
    }
  }

  componentWillMount () {
    this.fetchPartDetails ()
  }

  render() {
    let {partId} = this.props.data, content
    const leftItem = {
            icon: require ('../common/img/back.ios.png'),
            onPress: ()=> {Actions.pop()}
          }
        , rightItem = {
            icon: require ('../common/img/cart.png'),
            onPress: ()=> {Actions.Listings({partId})}
        }
        , {data, hasError, isLoading} = this.state
        , header = (
            <F8Header
              foreground="dark"
              style={General.headerStyle}
              leftItem={leftItem}
              rightItem={(!hasError && !isLoading)?rightItem:null}/>
        )

    if (isLoading) {
      return (<View style={{flex: 1}}>{header}<LoadingView/></View>)
    }
    else if (hasError) {
      return (<View style={{flex: 1}}>{header}<ErrorView/></View>)
    }
    else {
      let {part, manufacturer, listings, comments, tuning, buildCnt} = data
        , {name, partId, details, description, media} = part
        , {emission, included} = tuning
        , graphKeys = [
          'tqGain', 'hpGain', 'maxHp', 'maxTq', 'labor', 'weight',
          'rearLowering', 'frontLowering',
          'rearSpringRateStiffness','frontSpringRateStiffness']

        , dataArray = graphKeys.map ((key)=>{return {name: key, value: tuning[key]}})
        , specsContent = (dataArray && dataArray.length)?(<MetricsGraph data={[{entries: dataArray}]}/>):undefined
        , foregroundContent = (
          <View style={DetailStyles.foregroundContainer}>
          <Text style={DetailStyles.partTitle}>{name}</Text>
            {manufacturer && (
              <View style={{flex: 1, backgroundColor: 'white', height: 20, width: 80, marginVertical: 8}}>
              <Image source={{uri: manufacturer.logo}}
                      style={PostStyles.manufacturerLogo}/>
              </View>
            )
            }
          </View>
        )
        , images = (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {media.map ((mediaLink, idx)=> (<Image key={`${partId}-${idx}`} style={DetailStyles.scrollImage} source={{uri:mediaLink}}/>))}
          </ScrollView>

        )
        , detailsContent = (details && details.length)?(
          <View style={DetailStyles.descriptionContainer}>
          {
            details.map ((detail, idx)=> {
              return (
                <Heading3 key={`dtls-${idx}`}  style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 4}]}>{`- ${detail}`}</Heading3>
              )
            })
          }
          </View>
        ):undefined
      return (
        <ParallaxScrollView
          backgroundColor="transparent"
          contentBackgroundColor="white"
          backgroundSpeed={1}
          parallaxHeaderHeight={300+64}
          stickyHeaderHeight={64}
          renderFixedHeader={()=>(
            <View style={{marginTop: 24, marginLeft: 16, backgroundColor: 'transparent', flex: 1}}>
            <TouchableWithoutFeedback onPress={Actions.pop}>
              <Image source={require ('../common/img/back.ios.png')} style={{flex: -1}}/>
              </TouchableWithoutFeedback>
            </View>
          )}
          renderForeground={()=>{return foregroundContent}}
          renderBackground={() => <Image source={{uri: media[0]}} style={DetailStyles.VRImageHolder}/>}
          >
          <View style={{margin:8, alignItems: 'center'}}>
          {images}
          <SaveProductButton part={Object.assign ({}, {...part}, {...tuning}, {specId: this.state.specId})}/>
          {specsContent && (<Paragraph style={Titles.filterSectionTitle}>{"SPECS"}</Paragraph>)}
          {specsContent}
          {description && (<Paragraph style={Titles.filterSectionTitle}>{"DESCRIPTION"}</Paragraph>)}
          {description && (<Heading3 style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 4}]}>{`${description}`}</Heading3>)}
          {detailsContent && (<Paragraph style={Titles.filterSectionTitle}>{"DETAILS"}</Paragraph>)}
          {detailsContent}
          </View>
        </ParallaxScrollView>
      )
    }
  }
}
