'use strict'

import React, {Component} from 'react'
import {ListView, Text, View} from 'react-native'

import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import F8Header from '../common/F8Header'
import {LoadingView, ErrorView, EmptyView} from '../components'
import {Part} from '../part'
import {savedPartsSelector} from '../selectors'



const mapStateToProps = (state) => {
  return {
    savedParts: savedPartsSelector (state)
  }
}

class SavedPartsList extends Component {
  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows ([]),
    }
  }

  componentWillMount () {
    let {savedParts} = this.props
    this.setState ({dataSource: this.state.dataSource.cloneWithRows (savedParts)})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.savedParts != this.props.savedParts) {
      this.setState ({dataSource: this.state.dataSource.cloneWithRows (nextProps.savedParts)})
    }

  }

  render () {
    let {dataSource} = this.state
      , content
      , leftItem = {title: 'Back', onPress: Actions.pop}
    if (!dataSource.getRowCount()) {
      content = (<EmptyView
                caption={"You haven\'t saved any parts, let\'s start browsing!"}
                onPress={Actions.pop}
                />)
    } else {
      content = (
        <ListView
          style={{flex: 1, backgroundColor: '#F5F5F5'}}
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={(data, rowId)=>{return (<Part data={data} specId={data.specId}/>)}}
        />
      )
    }

    return (
      <View style={{flex: 1}}>
      <F8Header foreground="dark" title="Saved" leftItem={leftItem}/>
      {content}
      </View>
    )
  }
}

export default connect (mapStateToProps, ) (SavedPartsList)
