import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers' // он подхватит index.js а там экспорт по умолчанию

import { authMiddleware } from './authMiddleware'
import { cardSendMiddleware, cardGetMiddleware } from './cardMiddleware'

const CreateAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(authMiddleware, cardSendMiddleware, cardGetMiddleware), // в нее передаем кастомный middleware
      window.__REDUX_DEVTOOLS_EXTENSION__ //это middleware redux который следит за изменениями action
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (noop) => noop,
    ),
  )

  return store
}

export default CreateAppStore
