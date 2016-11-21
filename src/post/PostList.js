'use strict'
import React, {Component} from 'react'
import {List} from '../components'
import Post from './Post'
export default class PostList extends Component {
  render () {
    return <List emptyMsg="No Posts Yet..." {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}}/>
  }
}
