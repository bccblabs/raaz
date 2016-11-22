'use strict'
import React, {Component} from 'react'
import {List} from '../components'
import Post from './Post'
export default class PostList extends Component {
  render () {
  	console.log ('postlist', this.props)
    return <List emptyMsg="No Posts Yet..." {...this.props} renderRow={(data, rowId)=>{return (<Post data={data}/>)}}/>
  }
}
