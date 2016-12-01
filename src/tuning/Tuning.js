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

import {userIdSelector, profileSelector, accessTokenSelector, idTokenSelector} from '../selectors'

import {setUserData} from '../reducers/user/userActions'
import {setAccessToken, setIdToken} from '../reducers/history/historyActions'

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
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: (pageUrl) => {dispatch (fetchPosts (pageUrl, null))},

    setUserData: (user) => { dispatch (setUserData (user))},
    setAccessToken: (access_token) => {dispatch (setAccessToken (access_token))},
    setIdToken: (id_token) => {dispatch (setIdToken (id_token))},
  }
}

class Tuning extends Component {
  constructor (props) {
    super (props)
    this.fetchUserData = this.fetchUserData.bind (this)
    if (props.access_token && props.id_token) {this.state = {showModal: false, refreshing: false}}
    else {this.state = {showModal: true, refreshing: false}}
  }

  async fetchUserData (access_token) {
    try {
      let data = await Requests.fetchUserProfileApi (access_token)
      this.props.setUserData (data)
    } catch (err) {
      console.error (err)
    }
  }


  componentDidMount() {
      SplashScreen.hide();
  }

  componentWillMount() {
    let {access_token, setAccessToken, id_token, setIdToken} = this.props
      , userData = this.fetchUserData (access_token)

    access_token && setAccessToken(access_token)
    id_token && setIdToken (id_token)
  }

  _onRefresh () {
    this.setState ({refreshing: true})
    this.props.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    let {pagination, access_token, id_token} = nextProps
    this.setState ({
      refreshing: pagination.isFetching,
      showModal: (access_token && id_token)?false:true,
    })
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
    } = this.props

    , {showModal} = this.state

    console.log ('render', this.state, this.props)
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
        <AddPost/>
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
