import { logIn } from '../actions'
import { AUTHENTICATE } from '../actions'
import { serverLogin } from '../api'

export const authMiddleware = (store) => (next) => async (action) => {
  //все что здесь называется sideEffect=======================
  if (action.type === AUTHENTICATE) {
    const { email, password } = action.payload //вынимаем данные из ACTION
    const res = await serverLogin(email, password) //Отдаем данные в функцию авторизации

    if (res.success) {
      store.dispatch(logIn(res.token))
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
