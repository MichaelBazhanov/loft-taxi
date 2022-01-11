import { LOG_IN, LOG_OUT } from '../actions'

const login = localStorage.getItem('isLoggedIn') //пытаемся получить данные
const token = localStorage.getItem('token') //пытаемся получить данные
let initialState
login !== null
  ? (initialState = { isLoggedIn: Boolean(login), token: token })
  : (initialState = { isLoggedIn: Boolean(false), token: '' })

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      localStorage.setItem('isLoggedIn', true) //по типу action устанавливаем значение localStorage
      localStorage.setItem('token', action.payload.token) //по типу action устанавливаем значение localStorage
      return { isLoggedIn: true, token: action.payload.token } //возвращаем новый объект
    }

    case LOG_OUT: {
      localStorage.removeItem('isLoggedIn') //по типу action удаляем значение localStorage
      localStorage.removeItem('token') //по типу action удаляем значение localStorage
      return { isLoggedIn: false, token: '' } //возвращаем новый объект
    }

    default:
      return state
  }
}
