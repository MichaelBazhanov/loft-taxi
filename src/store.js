import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers' // он подхватит index.js а там экспорт по умолчанию

import { authMiddleware } from './authMiddleware'
import { cardMiddleware } from './cardMiddleware'

const CreateAppStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware, cardMiddleware),
  )

  return store
}

export default CreateAppStore
