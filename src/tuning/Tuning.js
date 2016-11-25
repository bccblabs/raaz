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


import {BuildList} from '../build'
import {buildsSelector, buildsPaginationSelector, buildCategoriesSelector} from '../selectors'
import {fetchCategoriesFromApi, fetchBuilds} from '../reducers/tuning/filterActions'

import {userIdSelector, profileSelector, myBuildsSelector, onStartSelector} from '../selectors'

import {setUserData, fetchUserBuilds, toggleOnStart} from '../reducers/user/userActions'
import {setAccessToken} from '../reducers/history/historyActions'

const mapStateToProps = (state, props) => {
  return {
    data: buildsSelector (state),
    pagination: buildsPaginationSelector(state),
    tags: buildCategoriesSelector (state),
    user: props.user,
    access_token: props.access_token,
    myBuilds: myBuildsSelector (state),
    onStart: onStartSelector (state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTags: () => { dispatch (fetchCategoriesFromApi ('car'))},
    fetchData: (pageUrl) => {dispatch (fetchBuilds (pageUrl))},
    setUserData: () => { dispatch (setUserData (props.user))},
    setAccessToken: () => {dispatch (setAccessToken (props.access_token))},
    fetchUserBuilds: () => {dispatch (fetchUserBuilds ())},
    toggleOnStart: () => {dispatch (toggleOnStart())}
  }
}

class Tuning extends Component {
  constructor (props) {
    super (props)
    this.state = {showModal: false}
  }

  componentWillMount() {
    this.props.setUserData()
    this.props.setAccessToken()
    this.props.fetchUserBuilds()
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
      tags, 
      userId, 
      fetchTags, 
      fetchData,
      toggleOnStart
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
        <BuildList key="builds-home" data={data} pagination={pagination} tags={tags} fetchTags={fetchTags} fetchData={fetchData}/>
        </ScrollView>
        <Modal 
          animationType={"slide"}
          transparent={true}
          visible={showModal} 
          onRequestClose={toggleOnStart}>
          <View style={General.modalStyle}>
          <Text style={{fontFamily: 'Futura-CondensedExtraBold', color: 'black'}}>You haven't added ur ride, bruh</Text>
          <View style={{flexDirection: 'row', marginTop: 40}}>
          <F8Button type="saved" style={{flex: 0, margin: 4}} caption="Add My Car" onPress={()=>{toggleOnStart(); Actions.NewBuild()}}/>          
          <F8Button type="unsaved" style={{flex: 0, margin: 4}} onPress={()=>{toggleOnStart() && this.setState ({showModal: false})}} caption="Got it, Later!"/>          
          </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (Tuning)
