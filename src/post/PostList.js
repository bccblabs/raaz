'use strict'
import React, {Component} from 'react'
import {List} from '../components'
import Post from './Post'
import {AddPost} from '../components'
export default class PostList extends Component {
  render () {
    return <List {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}} wall={true} emptyMsg="No Posts Yet..." />
  }
}
