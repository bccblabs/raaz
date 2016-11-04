'use strict'

const {List, Map, Record} = require ('immutable')

const partInitiaState = Record ({
  partMake: '',
  partId: '',
  partName: '',

  partMedia: new (List),
  partSpecs: new (Map),

  specId: new (List),
})

export default partInitiaState
