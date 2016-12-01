'use strict'
import {API_ENDPOINT, REQ_TIMEOUT, GET_OPTS} from '../constants'
const timeout = (ms) => {
  return new Promise ((resolve, reject) => {
    setTimeout (()=> {
      reject (new Error ('timed out!'))
    }, ms)
  })
}

const fetchWithTimeout = (ms, ...args) => {
  return Promise.race ([fetch (...args), timeout (ms)])
}

export const Utils = {
  parseLabelName (name) {
    switch (name) {
      case 'horsepower':
        return 'Horsepower (hp)'
      case 'torque':
        return 'Torque (lb/ft)'
      case 'city':
        return 'City MPG'
      case 'highway':
        return 'Highway MPG'
      case 'displacement':
        return 'Displacement (cc)'
      case 'max_hp_rpm':
        return 'Max Horsepower RPM'
      case 'max_tq_rpm':
        return 'Max Torque RPM'
      case 'baseMSRP':
        return 'Base MSRP ($)'
      case 'baseInvoice':
        return 'Base Invoice ($)'
      case 'usedTmvRetail':
        return 'Used Retail By Edmunds True Market Value ($)'
      case 'usedPrivateParty':
        return 'Used Private Seller By Edmunds ($)'
      case 'usedTradeIn':
        return 'Used Trade-In By Edmunds ($)'
      case 'compressionRatio':
        return 'Compression Ratio'
      case 'cylinder':
        return 'Cylinders'
      case 'cargo_capacity':
        return 'Cargo Capacity (cubic inches)'
      case 'wheel_base':
        return 'Wheel Base (ft)'
      case 'turning_diameter':
        return 'Turning Diameter'
      case 'zero_sixty':
        return '0-60 MPH (s)'
      case 'ground_clearance':
        return 'Ground Clearance'
      case 'curb_weight':
        return 'Curb Weight'
      case 'drag':
        return 'Drag'
      case 'fuel':
        return '5-Year Fuel Cost ($)'
      case 'depreciation':
        return '5-Year Depreciation Cost ($)'
      case 'repairs':
        return '5-Year Repairs Cost ($)'
      case 'maintenance':
        return '5-Year Maintenance Cost ($)'
      case 'insurance':
        return '5-Year Insurance Cost ($)'
      case 'invoice':
        return 'Dealer Invoice Price ($)'
      case 'msrp':
        return 'Dealer MSRP ($)'
      case 'mileage':
        return 'Mileage'
      case 'interior_vol':
        return 'Interior Volume (cubic inches)'
      case 'tqGain':
        return 'Torque Gain (LB/FT)'
      case 'hpGain':
        return 'Horsepower Gain (HP)'
      case 'maxHp':
        return 'Maximum Horsepower (HP)'
      case 'maxTq':
        return 'Maximum Torque (LB/FT)'
      case 'labor':
        return 'Labor (Hours)'
      case 'weight':
        return 'Weight (LB)'
      case 'rearLowering':
        return 'Rear Lowering (inches)'
      case 'frontLowering':
        return 'Front Lowering (inches)'
      case 'rearSpringRateStiffness':
        return 'Rear Spring Stiffness Rate (%)'
      case 'frontSpringRateStiffness':
        return 'Front Spring Stiffness Rate (%)'
      case 'size':
        return 'Engine Size (Liter)'
      case 'cylinders': 
        return 'Engine Cylinders'
      default:
        return name
    }
  },

  parsePriceName (priceName) {
    switch (priceName) {
      case 'listPrice':
        return 'Listed Price'
      case 'msrp':
        return 'MSRP'
      case 'invoice':
        return 'Invoice'
      case 'dealerOfferPrice':
        return 'Dealer Offer'
      default:
        return priceName
    }
  },

  parseMetricFields (title, obj) {
    let entries = []
    Object.keys (obj).forEach ((key)=>{
        if (typeof obj[key] === 'number' && key !== 'year') {
          entries.push ({name: key, value: obj[key]})
        }
        if (key === 'prices') {
          return obj[key].map ((item)=>{
            entries.push ({name: item.price_name, value: item.price_value})
          })
        }
    })
    entries.filter ((item)=>{return typeof item !== 'undefined'}).sort ((a,b)=>a.name > b.name)
    return {title, entries}
  },

  computeVin (listingVin) {
    if (typeof listingVin !== 'undefined' || typeof listingVin !== 'null') {
      return listingVin.substring (0, 8) + listingVin.substring (9, 11)
    }
    return undefined
  },

  capitalize (terms) {
    return terms.split (' ').map ((term)=>term.replace(term[0], term[0].toUpperCase())).join (' ')
  },
}

export const Requests = {
  fetchPartDetails (partId, specId) {
    let url = API_ENDPOINT + '/tuning/parts/' + partId + '?specId=' + specId
    return fetchWithTimeout (REQ_TIMEOUT, url, GET_OPTS)
            .then ((resp)=> {return resp.json()})
            .catch ((err)=> {throw err})
  },

  fetchBuildDetails (buildId) {
    let url = API_ENDPOINT + '/build/details/' + buildId
    return fetchWithTimeout (REQ_TIMEOUT, url, GET_OPTS)
          .then ((resp) => {
            return resp.json()
          })
          .catch ((err) => {throw err})
  },
  fetchUserDetails (userId) {
    let url = API_ENDPOINT + '/user/' + userId
    return fetchWithTimeout (REQ_TIMEOUT, url, GET_OPTS)
            .then ((resp) => {return resp.json()})
            .catch ((err) => {throw err})
  },
  fetchPartsByManufacturer (specId, manufacturerId) {
    let url = API_ENDPOINT + '/tuning/manufacturer/' + manufacturerId + '/parts'
    return fetchWithTimeout (REQ_TIMEOUT, url, GET_OPTS)
            .then ((resp) => {return resp.json()})
            .catch ((err) => {throw err})

  },
  fetchUserProfileApi (access_token) {
    let url = API_ENDPOINT + '/socialSignIn?access_token=' + access_token

    return fetch ( url, {
      method: 'GET',
    })
    .then ((resp)=>{
      return resp.json()
    })
    .then ((respJson)=>{
      return respJson
    })
    .catch ((err) => {return err})

}

}


// module.exports = Utils
