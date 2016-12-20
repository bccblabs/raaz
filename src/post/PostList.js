'use strict'
import React, {Component} from 'react'
import {List} from '../components'
import {Post} from './'

export default class PostList extends Component {
  render () {
    return <List {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}} emptyMsg="No Posts Yet..." />
  }
}
