'use strict'

const {Map, Record, List} = require ('immutable')

const newpostInitialState = Record ({
  taggedCars: new (Map),
  selectedMedia: new (List),
})

export default newpostInitialState
