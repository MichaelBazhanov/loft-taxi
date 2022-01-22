import {
  GET_REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from './actions'

const initialState = {
  success: null,
  token: null,
  isLoading: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REGISTRATION: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        success: action.payload.success,
        token: action.payload.token,
      }
    }

    case REGISTRATION_FAILURE: {
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
