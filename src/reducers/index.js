import { combineReducers } from 'redux'
import card from './card'
import address from './address'
import routes from './routes'

import { default as authorizationReducer } from '../modules/authorization'
import { default as registrationReducer } from '../modules/registration'

export default combineReducers({
  authorizationReducer,
  registrationReducer,
  card,
  address,
  routes,
})
