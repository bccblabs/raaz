'use strict'

const {Map, Record, List} = require ('immutable')

const newpostInitialState = Record ({

  pickedMake: '',
  pickedModel: '',
  pickedSubmodel: '',
  pickedSpecId: '',

  taggedCars: new (Map),
  selectedMedia: new (List),
})

export default newpostInitialState
