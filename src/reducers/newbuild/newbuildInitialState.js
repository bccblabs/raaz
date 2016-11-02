'use strict'

const {List, Map, Record} = require ('immutable')

const newbuildInitiaState = Record ({
  pickedMake: '',
  pickedModel: '',
  pickedSubmodel: '',
  pickedSpecId: '',
  selectedMedia: new (List),
  installedParts: new (Map),
})

export default newbuildInitiaState