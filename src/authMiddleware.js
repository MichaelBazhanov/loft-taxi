import { logIn } from './actions'
import { AUTHENTICATE } from './actions'
import { serverLogin } from './api'

export const authMiddleware = (store) => (next) => async (action) => {
  //все что здесь называется sideEffect=======================
  if (action.type === AUTHENTICATE) {
    const { email, password } = action.payload //вынимаем данные из ACTION
    const success = await serverLogin(email, password) //Отдаем данные в функцию авторизации
    if (success) {
      store.dispatch(logIn())
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
