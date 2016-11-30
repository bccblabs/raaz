'use strict'
import React, {Component} from 'react'
import {
  Image,
  Modal,
  ScrollView, 
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {DetailStyles, General} from '../styles'

import {AddPost} from '../components'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'


import {PostList} from '../post'
import {homePostSelector, homePostPaginationSelector} from '../selectors'
import {fetchPosts} from '../reducers/post/postActions'

import {userIdSelector, profileSelector} from '../selectors'

import {setUserData} from '../reducers/user/userActions'
import {setAccessToken} from '../reducers/history/historyActions'

import SplashScreen from 'react-native-splash-screen'


const mapStateToProps = (state, props) => {
  return {
    data: homePostSelector (state),
    pagination: homePostPaginationSelector(state),
    // user: props.user,
    // access_token: props.access_token,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPosts (pageUrl, null))},
    // setUserData: () => { dispatch (setUserData (props.user))},
    // setAccessToken: () => {dispatch (setAccessToken (props.access_token))},
  }
}

class Tuning extends Component {
  constructor (props) {
    super (props)
    this.state = {showModal: false}
  }

  componentDidMount() {
      SplashScreen.hide();
  }

  componentWillMount() {
    // this.props.setUserData()
    // this.props.setAccessToken()
  }

  componentWillReceiveProps(nextProps) {
    let {myBuilds, onStart} = nextProps
      , noBuilds = (myBuilds && myBuilds.ids && myBuilds.ids.length == 0)?true:false
      , showModal = noBuilds && onStart
    this.setState ({showModal})
  }

  render () {
    let rightItem = {
        icon: require ('../common/img/tuning.png'), 
        onPress:Actions.Saved
      }
    , {
      data, 
      pagination, 
      fetchData,
      access_token,
      user,
    } = this.props

    , {showModal} = this.state

    return (
      <View style={{flex: 1, backgroundColor:'transparent', marginBottom: 50}}>
        <F8Header title="Tuning" foreground='dark' rightItem={rightItem}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: -1}}>
        <F8Button style={{flex: 1}}
                  onPress={Actions.QRScan}
                  type="search"
                  icon={require ('../common/img/qr.png')}
                  caption={"Raaz qr"}/>
        <F8Button style={{flex: 1}}  onPress={Actions.Makes}
                  caption="Parts By car" type="search"
                  icon={require ('../common/img/search.png')}/>
        </View>
        <ScrollView>
        <AddPost/>
        <PostList key="posts-home" data={data} pagination={pagination} fetchData={fetchData}/>
        </ScrollView>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)
