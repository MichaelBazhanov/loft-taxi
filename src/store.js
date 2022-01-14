import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers' // он подхватит index.js а там экспорт по умолчанию

// import { authMiddleware } from './authMiddleware'
import { cardSendMiddleware, cardGetMiddleware } from './cardMiddleware'

//Подключаем главную SAGA
import createSagaMiddleware from 'redux-saga'
import { authSaga } from './authSaga' // saga -  сага авторизации
const sagaMiddleware = createSagaMiddleware()

//redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const CreateAppStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      // applyMiddleware(authMiddleware, cardSendMiddleware, cardGetMiddleware), // в нее передаем кастомный middleware
      applyMiddleware(sagaMiddleware, cardSendMiddleware, cardGetMiddleware), // в нее передаем кастомный middleware
    ),
  )

  sagaMiddleware.run(authSaga)

  return store
}

export default CreateAppStore
