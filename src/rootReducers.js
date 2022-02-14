import { combineReducers } from 'redux'

import { default as authorizationReducer } from './modules/authorization'
import { default as registrationReducer } from './modules/registration'
import { default as paymentReducer } from './modules/payment'
import { default as addressReducer } from './modules/address'
import { default as routesReducer } from './modules/route'

export default combineReducers({
  authorizationReducer,
  registrationReducer,
  paymentReducer,
  addressReducer,
  routesReducer,
})
