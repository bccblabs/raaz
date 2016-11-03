'use strict'

const {List, Map, Record} = require ('immutable')

const newbuildInitiaState = Record ({
  buildMake: '',
  buildModel: '',
  buildSubmodel: '',
  buildSpecId: '',

  buildYear: '',
  buildName: '',
  buildId: '',

  buildMedia: new (List),
  buildParts: new (Map),
})

export default newbuildInitiaState