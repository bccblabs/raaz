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
      ids : [],
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

    if (clear) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState ({
        dataSource: ds.cloneWithRows (data),
        data: data,
        pagination,
      })
    }
    else if (!isEqual(pagination.ids, this.props.pagination.ids)) {
      console.log (data, this.props.data)
      let ids = union (this.props.pagination.ids, pagination.ids)
        , blob = union (this.state.data, data)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (blob),
        data: blob,
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

      // if (isFetching) content = (<LoadingView/>)
      // else 
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
