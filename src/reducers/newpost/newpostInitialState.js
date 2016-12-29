'use strict'

const {Map, Record, List} = require ('immutable')

const newpostInitialState = Record ({
  linkedBuilds: new (Map),
  linkedParts: new (Map),
  location: '',

  media: new (List),
  text: '',

})

export default newpostInitialState
