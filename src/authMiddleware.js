import { logIn } from './actions'
import { AUTHENTICATE } from './actions'
import { serverLogin } from './api'

export const authMiddleware = (store) => (next) => async (action) => { console.log('authMiddleware.js')
  //все что здесь называется sideEffect=======================
  if (action.type === AUTHENTICATE) { console.log('22222222222222')
    const { email, password } = action.payload //вынимаем данные из ACTION
    const success = await serverLogin(email, password) //Отдаем данные в функцию авторизации
    console.log(success, email, password )
    if (success) { console.log('3333333333333333333')
      store.dispatch(logIn())
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
