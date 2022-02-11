import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actions'

const initialState = {
  isShown: false, //отобразить или нет
  text: '',
  type: 'success', // success or warning or error
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        isShown: true, //отобразить или нет
        text: action.payload.text,
        type: action.payload.type,
      }
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        isShown: false, //отобразить или нет
      }
    }
    default:
      return state
  }
}
