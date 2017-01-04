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
import {DetailStyles, General, WIDTH,} from '../styles'

import {AddPost, NewPostButton, LoadingView} from '../components'
import F8Header from '../common/F8Header'
import F8Button from '../common/F8Button'
import {Bar} from 'react-native-progress'


import {PostList} from '../post'
import {
  homePostSelector, 
  homePostPaginationSelector,
  uploadProgressSelector
} from '../selectors'
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

    uploadProgress: uploadProgressSelector (state)
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
    this.state = {uploadProgress: props.uploadProgress, showModal: false, refreshing: false, userId: null}
  }

  async fetchUserData (refresh_token) {
    try {
      let {id_token} = await Requests.renewIdToken (refresh_token)
      let data = await Requests.fetchUserProfileApi (id_token)
      this.props.setUserData (data)
      console.log ('user',data)
      data && data.user_id && this.setState ({userId: data.user_id})
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
    let {pagination, refresh_token, uploadProgress} = nextProps
    this.setState ({
      refreshing: this.state.refreshing && pagination.isFetching,
      showModal: (refresh_token === null || refresh_token === undefined)?true:false,
      uploadProgress
    })
  }

  render () {
    let {
      data, 
      pagination, 
      fetchData,
      refresh_token
    } = this.props

    , {showModal, uploadProgress} = this.state
    , uploadIndicator = (uploadProgress.isUploading)?(
      <View style={{top: 76, width: WIDTH, alignItems: 'center', justifyContent: 'center', position:'absolute', flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <Text style={{margin: 8, color: 'white', fontWeight: 'bold'}}>{"Uploading..."}</Text>
      {
        uploadProgress.hasError?(<View><Text>{"Error occured..."}</Text></View>):(<Bar style={{margin: 8}} height={8} width={300} progress={uploadProgress.uploadProgress} color='green' />)
      }
      </View>
      ):(<View/>)
    return (
      <View style={{flex: 1, backgroundColor:'transparent'}}>
        <F8Header title="TUNESQUAD" foreground={"dark"}/>
        <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind (this)}
                tintColor="black"
                title="Loading..."
                titleColor="black"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="black"
              />
          }
        >
        <PostList key="posts-home" data={data} pagination={pagination} fetchData={fetchData}/>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex: -1}}>
        <View style={{backgroundColor: 'transparent',flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'slategray', justifyContent: 'space-around', flex: -1}}>
          <F8Button style={{flex: 1}}
                    onPress={Actions.NewPost}
                    type="icon"
                    icon={require ('../common/img/camera.png')}
                    caption={"New Post"}/>
          <F8Button 
                    icon={require ('../common/img/video.png')} 
                    onPress={Actions.NewPost} 
                    type="icon" 
                    caption="Video" 
                    style={{flex: 1}}/>
          <F8Button 
                    icon={require ('../common/img/vr.png')} 
                    onPress={Actions.NewPost} 
                    type="icon" 
                    caption="VR" 
                    style={{flex: 1}}/>
          <F8Button style={{flex: 1}}  
                    onPress={Actions.Makes}
                    caption="Parts By car" 
                    type="icon"
                    icon={require ('../common/img/search.png')}/>
          <F8Button style={{flex: 1}}  
                    onPress={Actions.Saved}
                    caption="Saved" 
                    type="icon"
                    icon={require ('../common/img/heart.png')}/>
          <F8Button style={{flex: 1}}  
                    onPress={Actions.Home}
                    caption="Parts By car" 
                    type="icon"
                    icon={require ('../common/img/helmet.png')}/>
        </View>
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
        {uploadIndicator}
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)
