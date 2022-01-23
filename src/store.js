import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers' // он подхватит index.js а там экспорт по умолчанию

//Подключаем главную SAGA
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga' // rootSaga - главная сага в нее входят все саги
const sagaMiddleware = createSagaMiddleware()

//redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const CreateAppStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(sagaMiddleware), // в нее передаем кастомный middleware
    ),
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default CreateAppStore
