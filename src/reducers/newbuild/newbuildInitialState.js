'use strict'

const {List, Map, Record} = require ('immutable')

const newbuildInitiaState = Record ({
  buildMake: '',
  buildModel: '',
  buildSubmodel: '',

  buildSpecId: '',
  buildName: '',
  buildId: '',

  buildMedia: new (List),
  buildParts: new (Map),
  buildSpecs: new (Map),
})

export default newbuildInitiaState