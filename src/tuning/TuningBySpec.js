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

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {fetchCarDetails, fetchCategoriesFromApi} from '../reducers/tuning/filterActions'

import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Heading1, Heading2, Heading3, EmptyHeading, Paragraph} from '../common/F8Text'

import {
  BackSquare,
  LoadingView, 
  ErrorView, 
  Manufacturers, 
  MetricsGraph, 
  PostCard
} from '../components'

import {DetailStyles, General, Specs, Titles, PartStyles, PostStyles} from '../styles'

import {specDetailsPaginationSelector, specDetailsSelector} from '../selectors'


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
    },
    fetchCategories: (key)=> {
      dispatch (fetchCategoriesFromApi (key))
    },
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
    let {specId, fetchSpecsDetails, fetchCategories} = this.props
    fetchSpecsDetails(specId)
    fetchCategories (specId)
  }

  componentWillReceiveProps (nextProps) {
    let {specsPagination, specsDetails} = nextProps
      , specsInfo = specsDetails[0]

    console.log({nextProps})
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
        , {
            cylinders, compressor, configuration,
            transmissionSpeed, transmission, drivenWheels, size,
          } = specs
        , graphKeys = ['horsepower', 'torque']

      const dataArray = graphKeys.map ((key)=>{return {name: key, value: specs[key]}})

      let tuningcomponent = (
        specsInfo.tuning && specsInfo.tuning.length )?(
          <View style={DetailStyles.descriptionContainer}>
              <Heading3 style={Titles.filterSectionTitle}>{"BRANDS BY CATEGORY"}</Heading3>
              <Manufacturers data={tuning} specId={specId}/>
            </View>
        ): (<View/>)

        , postsContent = (posts && posts.length)?(
          <View style={[DetailStyles.descriptionContainer]}>
          <Heading3 style={Titles.filterSectionTitle}>{"BUILDS"}</Heading3>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
            {posts.map ((post, idx)=>(<PostCard key={`pc-${idx}`} data={post}/>))}
          </ScrollView>
          <F8Button
            style={{alignSelf: 'center', marginTop: 16}}
            onPress={()=>{Actions.BuildsBySpecId({specId})}}
            type="tertiary" caption={`All Builds`}
            icon={require ('../common/img/comment.png')}
          />
          </View>

        ):(<View/>)

        , descContent = (
          <View style={DetailStyles.descriptionContainer}>
          <Heading3 style={Titles.filterSectionTitle}>{"SPECS"}</Heading3>
          <Heading3 style={Specs.subtitle}>{size.toFixed(1) + ` L ${configuration}-${cylinders} ${compressor}`.toUpperCase()}</Heading3>
          <Heading3 style={Specs.subtitle}>{`${drivenWheels}`.toUpperCase()}</Heading3>
          <MetricsGraph data={[{entries:dataArray}]}/>
          </View>
        )

        return (
          <View style={{flex: 1}}>
          <ParallaxScrollView
            contentBackgroundColor="white"
            backgroundSpeed={1}
            parallaxHeaderHeight={300+64}
            stickyHeaderHeight={64}
            renderFixedHeader={()=><BackSquare/>}
            fixedHeaderHeight={64}
            renderForeground={()=>{
              let string = (make + ' ' + model + ' ' + submodel).toUpperCase()
              return (<Text style={[DetailStyles.primaryTitle, DetailStyles.infoContainer]}>{string}</Text>)
            }}
            renderBackground={() => <WebView source={{uri: "https://storage.googleapis.com/vrview/index.html?image=https://s3.amazonaws.com/vr-web/images/IMG_3656.JPG&is_stereo=false"}} style={DetailStyles.VRImageHolder}/>}
            >
            {descContent}
            {postsContent}
            {tuningcomponent}
          </ParallaxScrollView>
          <F8Button
            style={[General.bottomButtonStyle, {backgroundColor: 'red'}]}
            onPress={()=>{Actions.PartFilter({filterId: specId, title: model + ' ' + submodel})} }
            type="saved" caption={`Search and Compare`}
            icon={require ('../common/img/tuning.png')}
          />
          </View>
        );
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (TuningBySpec)
