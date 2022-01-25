import { combineReducers } from 'redux'
import routes from './routes'

import { default as authorizationReducer } from '../modules/authorization'
import { default as registrationReducer } from '../modules/registration'
import { default as paymentReducer } from '../modules/payment'
import { default as addressReducer } from '../modules/address'

export default combineReducers({
  authorizationReducer,
  registrationReducer,
  paymentReducer,
  addressReducer,
  routes,
})
