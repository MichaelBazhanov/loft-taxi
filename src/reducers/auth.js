import { LOG_IN, LOG_OUT } from '../actions'

const data = localStorage.getItem('isLoggedIn') //пытаемся получить данные
let initialState
data !== null
  ? (initialState = { isLoggedIn: Boolean(data) })
  : (initialState = { isLoggedIn: false })

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      localStorage.setItem('isLoggedIn', (state.isLoggedIn = true)) //по типу action устанавливаем значение localStorage
      return { isLoggedIn: true } //возвращаем новый объект
    }

    case LOG_OUT: {
      localStorage.removeItem('isLoggedIn') //по типу action удаляем значение localStorage
      localStorage.removeItem('token') //по типу action удаляем значение localStorage
      return { isLoggedIn: false } //возвращаем новый объект
    }

    default:
      return state
  }
}
