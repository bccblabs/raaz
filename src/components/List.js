'use strict'

import React, {Component} from 'react'
import {ListView, Text, View} from 'react-native'
import {union, isEqual} from 'lodash'
import {Actions} from 'react-native-router-flux'

import F8Header from '../common/F8Header'
import TagsHeader from './TagsHeader'
import ErrorView from './ErrorView'
import LoadingView from './LoadingView'
import EmptyView from './EmptyView'

import {General, btnColor} from '../styles'

export default class List extends Component {

  constructor (props) {
    super (props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      , {data, pagination, clear} = props
      , initialBlob = clear?[]:data
    this.state = {
      dataSource: ds.cloneWithRows (initialBlob),
      data: initialBlob,
      pagination: props.pagination,
    }
  }

  componentDidMount () {
    let {fetchTags, fetchData, pagination} = this.props
    fetchTags && fetchTags ()
    fetchData && fetchData (pagination.nextPageUrl)
  }

  componentWillReceiveProps (nextProps) {
    let {data, tags, pagination} = nextProps
    if (!isEqual(data, this.props.data)) {
      let newBlob = union (this.state.data, data)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        data: newBlob,
        pagination,
      })
    }
  }

  render () {
    let {dataSource, pagination} = this.state
      , { title, fetchData, fetchTags, tags, renderRow, emptyMsg} = this.props
      , {nextPageUrl, isFetching, hasError} = pagination
      , header = title?(<F8Header foreground="dark" title={title.toUpperCase()} leftItem={{title:'Back', onPress: Actions.pop}}/>):<View/>
      , content

      if (isFetching) content = (<LoadingView/>)
      else if (hasError) {
        content = (<ErrorView
                    onPress={()=>{
                      fetchTags && fetchTags()
                      fetchData && fetchData()
                    }}
                    />)
      }
      else if (!dataSource.getRowCount()) {
        content = (<EmptyView emptyMsg={emptyMsg}/>)
      }
      else {
        content = (
          <ListView
            style={{flex: 1, backgroundColor: 'white'}}
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={renderRow}
            onEndReached={()=>{
              if (nextPageUrl) { fetchData (nextPageUrl)}
            }}
          />
        )
      }

    return (
      <View style={{flex: 1}}>
        {header}
        {content}
      </View>
    )
  }
}
