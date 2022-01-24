import { combineReducers } from 'redux'
import address from './address'
import routes from './routes'

import { default as authorizationReducer } from '../modules/authorization'
import { default as registrationReducer } from '../modules/registration'
import { default as paymentReducer } from '../modules/payment'

export default combineReducers({
  authorizationReducer,
  registrationReducer,
  paymentReducer,
  address,
  routes,
})
