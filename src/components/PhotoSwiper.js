import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import {Actions} from 'react-native-router-flux'
import PhotoView from 'react-native-photo-view'
import {Heading3} from '../common/F8Text'
const { width, height } = Dimensions.get('window')

var styles = {
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width,
    height,
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row'
  },
  thumb: {
    width: 50,
    height: 50
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
      <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
      </View>
    </View>
  )
}

const Viewer = props => <Swiper index={props.index} style={styles.wrapper} renderPagination={renderPagination}>
  {
    props.imgList.map((item, i) => (
        <View key={i} style={styles.slide}>
        <TouchableWithoutFeedback onPress={e => props.pressHandle()}>
          <PhotoView
            source={{uri: item}}
            resizeMode='contain'
            minimumZoomScale={0.5}
            maximumZoomScale={3}
            androidScaleType='center'
            style={styles.photo} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Actions.pop}>
          <View style={{flex: -1, marginBottom: 16}}>
          <Heading3 style={{color: 'white'}}>{"Back"}</Heading3>
          </View>
        </TouchableWithoutFeedback>

      </View>
    ))
  }
</Swiper>
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgList: props.imgList,
      showViewer: true,
      showIndex: 0
    }
    this.viewerPressHandle = this.viewerPressHandle.bind(this)
    this.thumbPressHandle = this.thumbPressHandle.bind(this)
  }
  viewerPressHandle () {
    this.setState({
      showViewer: false
    })
  }
  thumbPressHandle (i) {
    this.setState({
      showIndex: i,
      showViewer: true
    })
  }
  render () {
    return (
      <View style={{flex: 1}}>
      {this.state.showViewer && <Viewer
        index={this.state.showIndex}
        pressHandle={this.viewerPressHandle}
        imgList={this.state.imgList} />}
    </View>)
  }
}