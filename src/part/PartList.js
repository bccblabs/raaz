'use strict'
import React, {Component} from 'react'
import List from '../components/List'
import Part from './Part'
export default class PartList extends Component {
  render () {
    return <List {...this.props} showHeader={true} renderRow={(data, rowId)=>{return (<Part data={data} specId={this.props.specId}/>)}}/>
  }
}
