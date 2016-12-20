'use strict'
import React, {Component} from 'react'
import {
  Image,
  Modal,
  RefreshControl,
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

import {userIdSelector, profileSelector, accessTokenSelector, idTokenSelector, refreshTokenSelector} from '../selectors'

import {setUserData} from '../reducers/user/userActions'
import {setAccessToken, setIdToken, setRefreshToken} from '../reducers/history/historyActions'

import SplashScreen from 'react-native-splash-screen'

import {Login} from '../user'

import {Requests} from '../utils'

const mapStateToProps = (state, props) => {
  return {
    data: homePostSelector (state),
    pagination: homePostPaginationSelector(state),

    user: props.user,
    access_token: accessTokenSelector (state, props),
    id_token: idTokenSelector (state, props),
    refresh_token: refreshTokenSelector (state, props),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPosts (pageUrl, null))},

    setUserData: (user) => { dispatch (setUserData (user))},
    setAccessToken: (access_token) => {dispatch (setAccessToken (access_token))},
    setIdToken: (id_token) => {dispatch (setIdToken (id_token))},
    setRefreshToken : (refresh_token) => {dispatch (setRefreshToken (refresh_token))},
  }
}

class Tuning extends Component {
  constructor (props) {
    super (props)
    this.fetchUserData = this.fetchUserData.bind (this)
    this.state = {showModal: false, refreshing: false}
  }

  async fetchUserData (refresh_token) {
    try {
      let {id_token} = await Requests.renewIdToken (refresh_token)
      let data = await Requests.fetchUserProfileApi (id_token)
      this.props.setUserData (data)
    } catch (err) {
      console.error (err)
    }
  }


  componentDidMount() {
    SplashScreen.hide();
    let {access_token, setAccessToken, id_token, setIdToken, refresh_token, setRefreshToken} = this.props
    access_token && setAccessToken(access_token)
    id_token && setIdToken (id_token)
    refresh_token && setRefreshToken (refresh_token)
    refresh_token && this.fetchUserData (refresh_token)
  }

  _onRefresh () {
    this.setState ({refreshing: true})
    this.props.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    let {pagination, refresh_token} = nextProps
    this.setState ({
      refreshing: this.state.refreshing && pagination.isFetching,
      showModal: (refresh_token)?false:true,
    })
  }

  render () {
    let rightItem = {
        icon: require ('../common/img/heart.png'), 
        onPress:Actions.Saved
      }
    , leftItem = {
      icon: require ('../common/img/helmet.png'),
      onPress: ()=>{}
    }
    , {
      data, 
      pagination, 
      fetchData,
    } = this.props

    , {showModal} = this.state

    return (
      <View style={{flex: 1, backgroundColor:'transparent'}}>
        <F8Header title="Raaz" foreground='dark' leftItem={leftItem} rightItem={rightItem}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: -1}}>
        <F8Button style={{flex: 1}}
                  onPress={Actions.NewPost}
                  type="search"
                  icon={require ('../common/img/camera.png')}
                  caption={"New Post"}/>
        <F8Button style={{flex: 1}}  onPress={Actions.Makes}
                  caption="Parts By car" type="search"
                  icon={require ('../common/img/tuning.png')}/>
        </View>
        <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind (this)}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
          }
        >
        <PostList key="posts-home" data={data} pagination={pagination} fetchData={fetchData}/>
        </ScrollView>
        <Modal 
           animationType={"slide"}
           transparent={false}
           visible={showModal} 
           onRequestClose={()=>{}}>
           <View style={{flex: 1}}>
            <Login/>
           </View>
         </Modal>

      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)
