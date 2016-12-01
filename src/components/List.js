'use strict'

import React, {Component} from 'react'
import {ListView, RefreshControl, Text, View} from 'react-native'
import {union, isEqual} from 'lodash'
import {Actions} from 'react-native-router-flux'

import F8Button from '../common/F8Button'
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
    this.state = {
      dataSource: ds.cloneWithRows ([]),
      data: [],
      pagination: props.pagination,
    }
  }
  componentWillMount() {
      let {data, pagination, clear} = this.props
      , initialBlob = clear?[]:data

    this.setState ({
      dataSource: this.state.dataSource.cloneWithRows (initialBlob),
      data: initialBlob,
    })
    
  }
  componentDidMount () {
    let {fetchTags, fetchData, pagination} = this.props
    fetchTags && fetchTags ()
    fetchData && fetchData ()
  }

  componentWillReceiveProps (nextProps) {
    let {data, tags, pagination, clear} = nextProps

    if (clear) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState ({
        dataSource: ds.cloneWithRows (data),
        data: data,
        pagination,
      })
    }
    else if (!isEqual(data, this.state.data)) {
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
      , { title, fetchData, fetchTags, tags, renderRow, emptyMsg, wall} = this.props
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
      else {
        content = (
          <ListView
            style={{flex: 1, backgroundColor: 'white'}}
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
        {header}
        {content}
      </View>
    )
  }
}
