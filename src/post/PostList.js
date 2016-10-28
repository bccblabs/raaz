'use strict'
import React, {Component} from 'react'
import {List} from '../components'
import Post from './Post'
export default class PostList extends Component {
  render () {
    console.log ('postlist, props=', this.props)
    return <List {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}}/>
  }
}
