import { LOG_IN, LOG_OUT, AUTHENTICATE, LOG_IN_FAILURE } from './actions'

const login =  localStorage.getItem('isLoggedIn') //пытаемся получить данные
const token = localStorage.getItem('token') //пытаемся получить данные

let initialState
if (login === "true") {
  initialState = {
    isLoggedIn: true,
    token: token,
    isLoading: false,
    error: null,
  }
} else {
  initialState = {
    isLoggedIn: false,
    token: null,
    isLoading: false,
    error: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LOG_IN: {
      localStorage.setItem('isLoggedIn', true) //по типу action устанавливаем значение localStorage
      localStorage.setItem('token', action.payload.token) //по типу action устанавливаем значение localStorage
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      } //возвращаем новый объект
    }

    case LOG_OUT: {
      localStorage.removeItem('isLoggedIn') //по типу action удаляем значение localStorage
      localStorage.removeItem('token') //по типу action удаляем значение localStorage
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        token: null,
      } //возвращаем новый объект
    }

    case LOG_IN_FAILURE: {
      localStorage.removeItem('isLoggedIn') //по типу action удаляем значение localStorage
      localStorage.removeItem('token') //по типу action удаляем значение localStorage
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    }

    default:
      return state
  }
}
