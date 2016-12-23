'use strict'

import React, {Component} from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {connect} from 'react-redux'

import {Actions} from 'react-native-router-flux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Requests} from '../utils'

import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'
import {Heading3, Paragraph} from '../common/F8Text'
import {General, Titles, DetailStyles, PostStyles, Specs} from '../styles'
import {
  AddPost,
  BackSquare,
  ErrorView, 
  ImagesScroll,
  LoadingView, 
  MetricsGraph, 
  SaveProductButton
} from '../components'

import {BuildsPagerByPartId} from '../build'
import {PostsByPartId} from '../post'
import {fetchPostsByPartId} from '../reducers/post/postActions'

import {userIdSelector} from '../selectors'
const mapStateToProps = (state) => {
  return {
    userId: userIdSelector (state)
  }
}

class PartDetails extends Component {
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
    let {hasError, isLoading} = this.state
        , content
        , leftItem = {
            icon: require ('../common/img/back.ios.png'),
            onPress: ()=> {Actions.pop()}
          }
        , header = (
            <F8Header
              foreground="dark"
              style={General.headerStyle}
              leftItem={leftItem}/>
        )

    if (isLoading) {
      return (<View style={{flex: 1}}>{header}<LoadingView/></View>)
    }
    else if (hasError) {
      return (<View style={{flex: 1}}>{header}<ErrorView/></View>)
    }
    else {
      let {part, manufacturer, tuning} = this.state.data
        , {name, partId, details, description, media} = part
        , graphKeys = [
          'tqGain', 'hpGain', 'maxHp', 'maxTq', 'labor', 'weight',
          'rearLowering', 'frontLowering',
          'rearSpringRateStiffness','frontSpringRateStiffness']
        , specId = this.props.data.specId
        , dataArray = graphKeys.map ((key)=>{return {name: key, value: tuning[key]}})
        , foregroundContent = (
          <View style={DetailStyles.infoContainer}>
            <TouchableWithoutFeedback onPress={()=>Actions.Manufacturer({manufacturer, specId})}>
            <Image 
              style={[PostStyles.manufacturerPhoto]} 
              source={{uri: manufacturer.logo}}
            />
            </TouchableWithoutFeedback>
            <Text style={DetailStyles.partTitle}>{name}</Text>
          </View>
        )
        , detailsContent = (details && details.length)?(
          <View style={DetailStyles.descriptionContainer}>
          {
            details.map ((detail, idx)=> {
              return (
                <Heading3 key={`dtls-${idx}`}  style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 8, marginHorizontal: 16}]}>{`- ${detail}`}</Heading3>
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
            <View style={{flex: 1, flexDirection: 'row'}}>
            <BackSquare/>
            <SaveProductButton part={Object.assign ({}, {...part}, {...tuning}, {specId: this.state.specId})}/>
            </View>
          )}
          renderForeground={()=>{return foregroundContent}}
          renderBackground={() => <Image source={{uri: media[0]}} style={DetailStyles.VRImageHolder}/>}
          >
          <View style={{flex: 1}}>
          <ImagesScroll media={media}/>
          <Heading3 style={Titles.filterSectionTitle}>{"SPECS"}</Heading3>
          <View alignSelf="center">
          {
            (dataArray && dataArray.length)?(<MetricsGraph data={[{entries: dataArray}]}/>):(<View/>)
          }
          </View>
          <View style={{backgroundColor: 'white', alignSelf: 'flex-start'}}>
          {description && (<Heading3 style={Titles.filterSectionTitle}>{"DESCRIPTION"}</Heading3>)}
          {description && (<Heading3 style={[Specs.subtitle, {alignSelf: 'flex-start', margin: 16}]}>{`${description}`}</Heading3>)}
          {detailsContent && (<Heading3 style={Titles.filterSectionTitle}>{"DETAILS"}</Heading3>)}
          {detailsContent}
          </View>
          <PostsByPartId style={{paddingTop: 16}} partId={partId}/>
          </View>
        </ParallaxScrollView>
      )
    }
  }
}

export default connect (mapStateToProps) (PartDetails)