import { GET_ADDRESS_LIST, ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAILURE } from './actions'

const initialState = {
  address: [],
  isLoading: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS_LIST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ADDRESS_LIST_SUCCESS: {
      return {
        ...state,
        address: action.payload.address,
        isLoading: false,
      }
    }
    case ADDRESS_LIST_FAILURE: {
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
