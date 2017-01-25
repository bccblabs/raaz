'use strict'

import React, {Component} from 'react'
import {ListView, RefreshControl, Text, View} from 'react-native'
import {union, isEqual} from 'lodash'
import {Actions} from 'react-native-router-flux'

import F8Button from '../common/F8Button'
import F8Header from '../common/F8Header'

import {TagsHeader, ErrorView, LoadingView, EmptyView, BackSquare} from './'
import {General, btnColor} from '../styles'

export default class List extends Component {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows ([]),
      data: [],
      pagination: {},
    }

  }

  componentDidMount () {
    let {fetchTags, fetchData, pagination , data} = this.props
    fetchTags && fetchTags ()
    fetchData && fetchData ()
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState ({
        dataSource: ds.cloneWithRows (data),
        data: data,
        pagination,
      })

  }

  shouldComponentUpdate(nextProps, nextState) {
    return  !(nextProps.pagination.ids === this.props.pagination.ids)
  }

  componentWillReceiveProps (nextProps) {

    let {data, tags, pagination, clear} = nextProps

    // if (clear) {
    // }
    if (!isEqual(pagination.ids, this.props.pagination.ids)) {
      let ids = union (this.state.pagination.ids, pagination.ids)
        , blob = union (this.state.data, data)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (blob),
        data: blob,
        pagination,
      })
    } else {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState ({
        dataSource: ds.cloneWithRows (data),
        data: data,
        pagination,
      })
      
    }
  }

  render () {
    let {dataSource, pagination} = this.state
      , { title, fetchData, fetchTags, tags, renderRow, emptyMsg, wall, showHeader, contentMarginTop} = this.props
      , {nextPageUrl, isFetching, hasError} = pagination
      , content

      if (isFetching) {
        content = (<LoadingView/>)
      }
      if (hasError) {
        content = (<ErrorView
                    onPress={()=>{
                      fetchTags && fetchTags()
                      fetchData && fetchData()
                    }}
                    />)
      }
      else {
        content = (
          <ListView
            style={{flex: 1, backgroundColor: 'transparent', marginTop: contentMarginTop?contentMarginTop:0}}
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={renderRow}
            renderFooter={()=> {
              if (nextPageUrl) return (<F8Button onPress={()=>{fetchData(nextPageUrl)}} type="spec" caption="More" style={{flex: -1}}/>)
              else return (<View/>)
            }}
          />
        )
      }
    return (
      <View style={{flex: 1}}>
        {content}
        {showHeader ? <BackSquare/> : <View/>}
      </View>
    )
  }
}
