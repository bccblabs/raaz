import keyMirror from 'key-mirror'

exports.REQ_TIMEOUT = module.exports.REQ_TIMEOUT = 5000;

exports.AUTH0_SIGNIN = module.exports.AUTH0_SIGNIN = 'https://raaz.auth0.com/authorize?response_type=token&client_id=38IZWX4rxcewydOFTD3fDuGRh7nyzDqi&redirect_uri=raaz://callback'

exports.AUTH0_CLIENT_ID = module.exports.AUTH0_CLIENT_ID ='38IZWX4rxcewydOFTD3fDuGRh7nyzDqi'
exports.AUTH0_CLIENT_SECRET = module.exports.AUTH0_CLIENT_SECRET ='RyE7bMsLckFWNCGSEaX0DkRsTHEryHX_d7yGwzQUXs8mwvvKa2qxIO3S0QNR54Og'
exports.AUTH0_DOMAIN = module.exports.AUTH0_DOMAIN ='https://raaz.auth0.com'

exports.AUTH0_CALLBACK_URL = '//raaz://callback'
exports.API_ENDPOINT = module.exports.API_ENDPOINT = "http://localhost:8080"

exports.GET_OPTS = module.exports.GET_OPTS = { method: 'GET', headers: {'Accept': 'application/json','Content-Type':'application/json'}}

export default keyMirror ({

  /* Global */
  NOOP: null,
  SET_CURRENT_LOCATION: null,
  SESSION_TOKEN_SUCCESS: null,
  SET_SESSION_TOKEN: null,
  SET_STORE: null,
  SET_ID_TOKEN: null,


  /* Posts */
  POSTS_REQUEST: null,
  POSTS_SUCCESS: null,
  POSTS_ERROR: null,

  POSTS_REQUEST_USER: null,
  POSTS_SUCCESS_USER: null,
  POSTS_ERROR_USER: null,

  POSTS_REQUEST_BUILD: null,
  POSTS_SUCCESS_BUILD: null,
  POSTS_ERROR_BUILD: null,

  POSTS_REQUEST_PART: null,
  POSTS_SUCCESS_PART: null,
  POSTS_ERROR_PART: null,

  /* User create post */
  RESET_POSTS_FILTER_STATE: null,
  SET_POSTS_FILTER_HASH: null,
  SET_POSTS_FILTER_STATE: null,

  SAVE_POST_DRAFT: null,
  LIKE_USER_POST: null,
  VIEW_USER_POST: null,

  ADD_TO_TAGGED_CARS: null,
  REMOVE_FROM_TAGGED_CARS: null,
  TOGGLE_POST_LIKE: null,

  ADD_MEDIA: null,
  REMOVE_MEDIA: null,

  TOGGLE_ON_START: null,

  CREATE_POST_REQUEST: null,
  CREATE_POST_SUCCESS: null,
  CREATE_POST_ERROR: null,




  /* user new build */
  ADD_BUILD_MEDIA: null,
  REMOVE_BUILD_MEDIA: null,
  SET_BUILD_IMAGE: null,
  SET_BUILD_NAME: null,

  ADD_BUILD_SPEC: null,
  EDIT_BUILD_SPEC: null,
  REMOVE_BUILD_SPEC: null,
  SET_BUILD_SPEC: null,

  ADD_PART: null, 
  EDIT_PART: null,
  REMOVE_PART: null,

  CREATE_BUILD_REQUEST: null,
  CREATE_BUILD_SUCCESS: null,
  CREATE_BUILD_ERROR: null,




  /* user custom part */
  ADD_PART_MEDIA: null,
  REMOVE_PART_MEDIA: null,
  SET_PART_IMAGE: null,
  SET_PART_NAME: null,

  ADD_PART_SPEC: null,
  EDIT_PART_SPEC: null,
  REMOVE_PART_SPEC: null,
  SET_PART_SPEC: null, 

  PART_TAG_SPECID: null,
  PART_REMOVE_SPECID: null,

  CREATE_PART_REQUEST: null,
  CREATE_PART_SUCCESS: null,
  CREATE_PART_ERROR: null,



  /* Events */
  EVENTS_REQUEST: null,
  EVENTS_SUCCESS: null,
  EVENTS_ERROR: null,

  RESET_EVENTS_FILTER_STATE: null,
  SET_EVENTS_FILTER_HASH: null,
  SET_EVENTS_FILTER_STATE: null,
  TOGGLE_EVENTS_FILTER_LIST_VALUE: null,




  /* Builds, Cars, Listings, Tuning, etc. */

  TOGGLE_PART_TAG: null,
  CLEAR_PART_TAG: null,

  SET_TUNING_TAGS: null,

  TOGGLE_BUILD_TAG: null,
  CLEART_BUILD_TAG: null,

  BUILDS_REQUEST: null,
  BUILDS_SUCCESS: null,
  BUILDS_ERROR: null,

  BUILDS_REQUEST_PART: null,
  BUILDS_SUCCESS_PART: null,
  BUILDS_ERROR_PART: null,

  BUILDS_REQUEST_TAG: null,
  BUILDS_SUCCESS_TAG: null,
  BUILDS_ERROR_TAG: null,

  BUILDS_REQUEST_USER: null,
  BUILDS_SUCCESS_USER: null,
  BUILDS_ERROR_USER: null,

  BUILDS_REQUEST_SPECID: null,
  BUILDS_SUCCESS_SPECID: null,
  BUILDS_ERROR_SPECID: null,

  BUILDS_REQUEST_MANU: null,
  BUILDS_SUCCESS_MANU: null,
  BUILDS_ERROR_MANU: null,

  PARTS_REQUEST: null,
  PARTS_SUCCESS: null,
  PARTS_ERROR: null,

  PARTS_MANU_REQUEST: null,
  PARTS_MANU_SUCCESS: null,
  PARTS_MANU_ERROR: null,

  PARTS_BUILD_REQUEST: null,
  PARTS_BUILD_SUCCESS: null,
  PARTS_BUILD_ERROR: null,


  DEALS_REQUEST: null,
  DEALS_SUCCESS: null,
  DEALS_ERROR: null,

  TAGS_REQUEST: null,
  TAGS_SUCCESS: null,
  TAGS_ERROR: null,

  CAR_REQUEST: null,
  CAR_SUCCESS: null,
  CAR_ERROR: null,

  CAT_REQUEST: null,
  CAT_SUCCESS: null,
  CAT_ERROR: null,

  MAKE_REQUEST: null,
  MAKE_SUCCESS: null,
  MAKE_ERROR: null,

  MODEL_REQUEST: null,
  MODEL_SUCCESS: null,
  MODEL_ERROR: null,

  SUBMODEL_REQUEST: null,
  SUBMODEL_SUCCESS: null,
  SUBMODEL_ERROR: null,

  SPECS_REQUEST: null,
  SPECS_SUCCESS: null,
  SPECS_ERROR: null,

  SPECS_DETAILS_REQUEST: null,
  SPECS_DETAILS_SUCCESS: null,
  SPECS_DETAILS_ERROR: null,

  SPECS_MANU_REQUEST: null,
  SPECS_MANU_SUCCESS: null,
  SPECS_MANU_ERROR: null,


  SET_SELECTED_MAKE: null,
  SET_SELECTED_MODEL: null,
  SET_SELECTED_SUBMODEL: null,
  SET_SELECTED_SPECID: null,

  /* History */

  ADD_TO_SAVED_SPECS: null,
  TOGGLE_SAVE_PRODUCT: null,

  SET_ACCESS_TOKEN: null,
  LOAD_HISTORY: null,




  /* Social Login and Profile */
  LOGIN: null,
  LOGGED_IN: null,
  UPDATE_EMAIL: null,
  UPDATE_PHONE: null,
  UPDATE_ADDRESS: null,
  UPDATE_CITY: null,
  UPDATE_STATE: null,
  UPDATE_COUNTRY: null,
  UPDATE_ZIP: null,

  POST_COMMENT_REQ: null,
  POST_COMMENT_SUCCESS: null,
  POST_COMMENT_ERR: null,

  REPLY_COMMENT_REQ: null,
  REPLY_COMMENT_SUCCESS: null,
  REPLY_COMMENT_ERR: null,

})
