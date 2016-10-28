'use strict'
import React, {Component} from 'react'
import List from '../components/List'
import Part from './Part'
export default class PartList extends Component {
  render () {
    return <List clear={true} {...this.props} renderRow={(data, rowId)=>{return (<Part data={data} specId={this.props.specId}/>)}}/>
  }
}
