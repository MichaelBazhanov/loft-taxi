import { combineReducers } from 'redux'
import auth from './auth'
import card from './card'
import address from './address'
import routes from './routes'

export default combineReducers({
  auth,
  card,
  address,
  routes,
})
