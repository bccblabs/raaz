'use strict'
import React, {Component} from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  WebView,
  Text,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'

import {fetchCarDetails} from '../reducers/tuning/filterActions'
import {PartsBySpecId} from '../part'
import {specDetailsPaginationSelector, specDetailsSelector} from '../selectors'
import {DetailStyles, General, Specs, HEIGHT} from '../styles'

import {BuildsPagerBySpecId} from '../build'

import {
  BackSquare,
  LoadingView, 
  ErrorView, 
  TuningTags,
} from '../components'


const mapStateToProps = (state, props) => {
  return {
    specsDetails: specDetailsSelector(state, props),
    specsPagination: specDetailsPaginationSelector(state, props),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecsDetails: (specId)=>{
      dispatch (fetchCarDetails (specId))
    }
  }
}

class TuningBySpec extends Component {

  constructor (props) {
    super (props)
    this.state = {
      specsDetails: props.specsDetails,
      specsPagination: props.specsPagination,
    }
  }

  componentWillMount () {
    let {specId, fetchSpecsDetails} = this.props
    fetchSpecsDetails(specId)
  }

  componentWillReceiveProps (nextProps) {
    let {specsPagination, specsDetails} = nextProps
      , specsInfo = specsDetails[0]

    this.setState ({
      specsDetails,
      specsPagination,
    })
  }


  render () {
    let {specsDetails, specsPagination} = this.state
      , specsInfo = this.state.specsDetails[0]
      , leftItem = {icon: require ('../common/img/back.ios.png'), onPress: ()=> {Actions.pop ()}}
      , headerContent = (<F8Header foreground="dark" style={General.headerStyle} leftItem={leftItem}/>)
    if (specsPagination.isFetching) {
      return (
        <View style={{flex: 1}}>
          {headerContent}
          <LoadingView/>
        </View>
      )
    }
    else if (specsPagination.hasError || !specsInfo) {
      return (
        <View style={{flex: 1}}>
          {headerContent}
          <ErrorView onPress={()=>this.props.fetchSpecsDetails (this.props.specId)}/>
        </View>
        )
    }
    else {
      let {make, model, submodel, specId, tuning, specs, posts} = specsInfo
      return (
        <ParallaxScrollView
          contentBackgroundColor="white"
          backgroundColor="white"
          backgroundSpeed={1}
          parallaxHeaderHeight={HEIGHT}
          stickyHeaderHeight={64}
          renderFixedHeader={()=><BackSquare/>}
          renderForeground={() => (
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <TuningTags specId={specId}/>
              <F8Button 
                icon={require ('../common/img/car.png')}
                onPress={()=>Actions.BuildsBySpecId({specId})}
                style={{flex: -1,right: 8, position: 'absolute', bottom: 0}}            
                type="search" caption="See All Builds"/>
            </View>)}
          >
          <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <PartsBySpecId specId={specId}/>
          </View>
        </ParallaxScrollView>
      );
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningBySpec)
