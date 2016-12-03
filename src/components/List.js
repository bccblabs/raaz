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

    console.log ('constructor, props.ids', props.pagination.ids)
    console.log ('constructor, props.data', props.data)
  }

  componentDidMount () {
    let {fetchTags, fetchData, pagination} = this.props
    fetchTags && fetchTags ()
    fetchData && fetchData ()

    console.log ('componentDidMount, props.ids=', this.props.pagination.ids)
    console.log ('componentDidMount, state.ids=', this.state.ids)

    console.log ('componentDidMount, props.data=', this.props.data)
    console.log ('componentDidMount, state.data=', this.state.data)

  }

  shouldComponentUpdate(nextProps, nextState) {
    return  !(nextProps.pagination.ids === this.props.pagination.ids)
  }

  componentWillReceiveProps (nextProps) {

    console.log ('componentWillReceiveProps, this.props.ids', this.props.pagination.ids)
    console.log ('componentWillReceiveProps, nextProps.ids', nextProps.pagination.ids)
    console.log ('componentWillReceiveProps, this.state.ids', this.state.ids)

    console.log ('componentWillReceiveProps, this.props.data', this.props.data)
    console.log ('componentWillReceiveProps, nextProps.data', nextProps.data)
    console.log ('componentWillReceiveProps, this.state.data', this.state.data)

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
      console.log ('newblob', newBlob)
      this.setState ({
        dataSource: this.state.dataSource.cloneWithRows (newBlob),
        data: data,
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
