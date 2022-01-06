import { createStore } from 'redux'
import rootReducer from './reducers' // он подхватит index.js а там экспорт по умолчанию

const CreateAppStore = () => {
  const store = createStore(rootReducer)

  return store
}

export default CreateAppStore
