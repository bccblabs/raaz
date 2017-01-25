'use strict'
import { CALL_API, Schemas } from '../../middlewares/api'
const {
    TOGGLE_PART_TAG,
    CLEAR_PART_TAG,

    SET_TUNING_TAGS,

    TOGGLE_BUILD_TAG,
    CLEART_BUILD_TAG,

    BUILDS_REQUEST,
    BUILDS_SUCCESS,
    BUILDS_ERROR,

    BUILDS_REQUEST_PART,
    BUILDS_SUCCESS_PART,
    BUILDS_ERROR_PART,

    BUILDS_REQUEST_TAG,
    BUILDS_SUCCESS_TAG,
    BUILDS_ERROR_TAG,

    BUILDS_REQUEST_USER,
    BUILDS_SUCCESS_USER,
    BUILDS_ERROR_USER,

    BUILDS_REQUEST_SPECID,
    BUILDS_SUCCESS_SPECID,
    BUILDS_ERROR_SPECID,

    BUILDS_REQUEST_MANU,
    BUILDS_SUCCESS_MANU,
    BUILDS_ERROR_MANU,

    MANUFACTURERS_SPEC_REQUEST,
    MANUFACTURERS_SPEC_SUCCESS,
    MANUFACTURERS_SPEC_ERROR,

    PARTS_REQUEST,
    PARTS_SUCCESS,
    PARTS_ERROR,

    PARTS_MANU_REQUEST,
    PARTS_MANU_SUCCESS,
    PARTS_MANU_ERROR,

    PARTS_BUILD_REQUEST,
    PARTS_BUILD_SUCCESS,
    PARTS_BUILD_ERROR,

    PARTS_TAG_REQUEST,
    PARTS_TAG_SUCCESS,
    PARTS_TAG_ERROR,

    DEALS_REQUEST,
    DEALS_SUCCESS,
    DEALS_ERROR,

    TAGS_SPEC_REQUEST,
    TAGS_SPEC_SUCCESS,
    TAGS_SPEC_ERROR,

    SPECS_DETAILS_REQUEST,
    SPECS_DETAILS_SUCCESS,
    SPECS_DETAILS_ERROR,

    SPECS_MANU_REQUEST,
    SPECS_MANU_SUCCESS,
    SPECS_MANU_ERROR,


    CAT_REQUEST,
    CAT_SUCCESS,
    CAT_ERROR,

    MANUFACTURERS_REQUEST, 
    MANUFACTURERS_SUCCESS,  
    MANUFACTURERS_ERROR,

} = require ('../../constants').default

export function fetchBuilds (paging, category, tag, specId, userId) {
  let endpoint = '/build'
  if (paging) endpoint += paging
  return {
    key: 'home',
    [CALL_API]: {
      types: [BUILDS_REQUEST, BUILDS_SUCCESS, BUILDS_ERROR],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }
}

export function fetchBuildsByPartId (paging, partId) {
  let endpoint = '/build/part/' + partId
  if (paging) endpoint += paging
  return {
    partId,
    [CALL_API]: {
      types: [BUILDS_REQUEST_PART, BUILDS_SUCCESS_PART, BUILDS_ERROR_PART],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }
}

export function fetchBuildsByTag (paging, tag) {
  let endpoint = '/build/tag/' + tag
  if (paging) endpoint += paging
  return {
    tag,
    [CALL_API]: {
      types: [BUILDS_REQUEST_TAG, BUILDS_SUCCESS_TAG, BUILDS_ERROR_TAG],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }

}

export function fetchBuildsBySpecId (paging, specId) {
  let endpoint = '/build/specs/' + specId
  if (paging) endpoint += paging
  return {
    specId,
    [CALL_API]: {
      types: [BUILDS_REQUEST_SPECID, BUILDS_SUCCESS_SPECID, BUILDS_ERROR_SPECID],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }

}

export function fetchBuildsByUserId (paging, userId) {
  let endpoint = '/build/user/' + userId
  if (paging) endpoint += paging
  return {
    userId,
    [CALL_API]: {
      types: [BUILDS_REQUEST_USER, BUILDS_SUCCESS_USER, BUILDS_ERROR_USER],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }
}

export function fetchBuildsByManufacturerId (paging, manufacturerId) {
  let endpoint = '/build/manufacturer/' + manufacturerId
  if (paging) endpoint += paging
  return {
    manufacturerId,
    [CALL_API]: {
      types: [BUILDS_REQUEST_MANU, BUILDS_SUCCESS_MANU, BUILDS_ERROR_MANU],
      endpoint: endpoint,
      schema: Schemas.BUILDS_ARRAY,
    }
  }
}



export function clearPartTags () {
  return {
    type: CLEAR_PART_TAG
  }
}

export function togglePartTag (tag) {
  return {
    type: TOGGLE_PART_TAG,
    payload: tag
  }
}

export function toggleBuildTag (tag) {
  return {
    type: TOGGLE_BUILD_TAG,
    payload: tag
  }
}

export function clearBuildTag () {
  return {
    type: CLEAR_BUILD_TAG
  }
}


export function fetchDealsFromApi (specId) {
  let endpoint = '/deal', key = specId
  if (specId) endpoint += ('?specId=' + specId)
  else key='home'
  return {
    specId: key,
    [CALL_API]: {
      types: [DEALS_REQUEST, DEALS_SUCCESS, DEALS_ERROR],
      endpoint: endpoint,
      schema: Schemas.DEALS_ARRAY,
    }
  }
}

export function fetchCarDetails (specId) {
  let endpoint = '/car/specs/' + specId
  return {
    specId,
    [CALL_API]: {
      types: [SPECS_DETAILS_REQUEST, SPECS_DETAILS_SUCCESS, SPECS_DETAILS_ERROR],
      endpoint: endpoint,
      schema: Schemas.SPEC_DETAILS_ARRAY,
    }
  }
}

export function fetchParts (nextPageUrl, specId, tags) {
  let endpoint = nextPageUrl?('/tuning/spec/' + specId + nextPageUrl):('/tuning/spec/' + specId)
  return {
    specId,
    [CALL_API]: {
      types: [PARTS_REQUEST, PARTS_SUCCESS, PARTS_ERROR],
      endpoint: endpoint,
      schema: Schemas.PARTS_ARRAY,
    }
  }
}

export function fetchCategoriesFromApi (key) {
  let endpoint = (key==='car')?'/car/category':'/tuning/category/?specId=' + key
  return {
    key,
    [CALL_API]: {
      types: [CAT_REQUEST, CAT_SUCCESS, CAT_ERROR],
      endpoint: endpoint,
      schema: Schemas.CAT_ARRAY,
    }
  }
}

export function setSelectedTags (tags) {
  return {
    type: SET_TUNING_TAGS,
    payload: tags
  }
}

export function fetchPartsByManufacturer (manufacturerId, nextPageUrl, specId, category) {
  let endpoint = '/tuning/manufacturer/' + manufacturerId + '/spec/' + specId
    , url 
  url = category?(endpoint + '?category=' + category):endpoint
  url = nextPageUrl?(url + nextPageUrl):url

  return {
    manufacturerId,
    [CALL_API]: {
      types: [PARTS_MANU_REQUEST, PARTS_MANU_SUCCESS, PARTS_MANU_ERROR],
      endpoint: url,
      schema: Schemas.PARTS_ARRAY,
      data: []
    }
  }

}


export function fetchPartsByBuildId (buildId, nextPageUrl, tag) {
  let endpoint = '/build/details/' + buildId + '/part/' + tag
    , url = nextPageUrl ? (endpoint + nextPageUrl) : endpoint

  return {
    buildId,
    [CALL_API]: {
      types: [PARTS_BUILD_REQUEST, PARTS_BUILD_SUCCESS, PARTS_BUILD_ERROR],
      endpoint: url,
      schema: Schemas.PARTS_ARRAY,
    }
  }
}

export function fetchSpecsByManufacturer (manufacturerId, nextPageUrl) {
  let endpoint = '/manufacturer/' + manufacturerId + '/specs/'
      , url = nextPageUrl ? (endpoint + nextPageUrl) : endpoint

  return {
    manufacturerId,
    [CALL_API]: {
      types: [SPECS_MANU_REQUEST, SPECS_MANU_SUCCESS, SPECS_MANU_ERROR],
      endpoint: url,
      schema: Schemas.SPEC_ARRAY,
    }
  }
}

export function fetchTuningTags (specId, nextPageUrl) {
  let endpoint = '/tuning/spec/' + specId + '/tags'
    , url = nextPageUrl ? (endpoint + nextPageUrl) : endpoint
  return {
    specId,
    [CALL_API]: {
      types: [TAGS_SPEC_REQUEST, TAGS_SPEC_SUCCESS, TAGS_SPEC_ERROR],
      endpoint: url,
      schema: Schemas.TAGS_ARRAY,
    }
  }
}

export function fetchPartsByTag (tag, specId, nextPageUrl) {
  let endpoint = '/tuning/spec/' + specId + '/tags/' + tag
    , url = nextPageUrl ? (endpoint + nextPageUrl) : endpoint

  return {
    tag,
    [CALL_API]: {
      types: [PARTS_TAG_REQUEST, PARTS_TAG_SUCCESS, PARTS_TAG_ERROR],
      endpoint: url,
      schema: Schemas.PARTS_ARRAY,
    }
  }
}

export function fetchManufacturersBySpecId (specId) {
  let url = '/tuning/spec/' + specId + '/manufacturers'
  return {
    specId,
    [CALL_API]: {
      types: [MANUFACTURERS_SPEC_REQUEST, MANUFACTURERS_SPEC_SUCCESS,  MANUFACTURERS_SPEC_ERROR],
      endpoint: url,
      schema: Schemas.MANUFACTURERS_ARRAY,
    }
  }
}

export function fetchManufacturers () {
  return {
    specId: 'all',
    [CALL_API]: {
      types: [MANUFACTURERS_REQUEST, MANUFACTURERS_SUCCESS, MANUFACTURERS_ERROR],
      endpoint: '/manufacturer',
      schema: Schemas.MANUFACTURERS_ARRAY,
    }
  }
}


