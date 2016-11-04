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
  primaryImage: '',

  parts: new (Map),

  specEntries: new (Map),
})

export default newbuildInitiaState