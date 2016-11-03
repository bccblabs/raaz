'use strict'

const {
  PICK_MAKE,
  PICK_MODEL,
  PICK_SUBMODEL,
  PICK_SPECID,

  ADD_BUILD_MEDIA,
  REMOVE_BUILD_MEDIA,
  SET_PRIMARY_IMAGE,

  SET_NAME,

  ADD_SPEC_ENTRY,
  EDIT_SPEC_ENTRY,
  REMOVE_SPEC_ENTRY,

  ADD_BY_PART_ID: null,
  ADD_PART: null, 
  EDIT_PART: null,
  REMOVE_PART: null

} = require ('../../constants').default

export function setMake (value) {
  return {
    type: PICK_MAKE,
    payload: value
  }
}

export function setModel (value) {
  return {
    type: PICK_MODEL,
    payload: value
  }
}

export function setSubmodel (value) {
  return {
    type: PICK_SUBMODEL,
    payload: value
  }
}

export function setSpecId (value) {
  return {
    type: PICK_SPECID,
    payload: value
  }
}

export function addMedia (medialist) {
  return {
    type: ADD_BUILD_MEDIA,
    payload: medialist
  }
}

export function removeMedia (path) {
  return {
    type: REMOVE_BUILD_MEDIA,
    payload: path
  }
}

export function setPrimaryImage (path) {
	return {
		type: SET_PRIMARY_IMAGE,
		payload: path
	}
}


export function setName (value) {
  return {
    type: SET_NAME,
    payload: value
  }
}
  
export function addSpecEntry (name, value) {
  return {
    type: ADD_SPEC_ENTRY,
    payload: {name, value}
  }
}

export function editSpecEntry (name, value) {
  return {
    type: EDIT_SPEC_ENTRY,
    payload: {name, value}
  }
}

export function removeSpecEntry (name) {
  return {
    type: REMOVE_SPEC_ENTRY,
    payload: name
  }
}

export function addPartByPartId (partId) {
  return {
    type: ADD_BY_PART_ID,
    payload: partId
  }
}

export function addPart (part) {
  return {
    type: ADD_PART,
    payload: part
  }
}

export function removePart (partId) {
  return {
    type: REMOVE_PART,
    payload: partId
  }
}

export function editPart (partId, partInfo) {
  return {
    type: EDIT_PART,
    payload {partId, partInfo}
  }
}

