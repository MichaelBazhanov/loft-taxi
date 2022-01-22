import { combineReducers } from 'redux'
import auth from './auth'
import card from './card'
import address from './address'
import routes from './routes'

import { default as registrationReducer } from '../modules/registration'

export default combineReducers({
  auth,
  card,
  address,
  routes,
  registrationReducer
})
