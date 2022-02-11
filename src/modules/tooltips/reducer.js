import { SHOW, HIDE } from './actions'

const initialState = {
  isShown: false, //отобразить или нет
  text: '',
  type: 'success', // success or warning or error
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW: {
      return {
        ...state,
        isShown: true, //отобразить или нет
        text: action.payload.text,
        type: action.payload.type,
      }
    }
    case HIDE: {
      return {
        ...state,
        isShown: false, //отобразить или нет
      }
    }
    default:
      return state
  }
}
