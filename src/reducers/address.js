import { ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAILURE } from '../actions'

const initialState = {
  address: [],
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDRESS_LIST_SUCCESS: {
      return { address: action.payload.address, error: null }
    }
    case ADDRESS_LIST_FAILURE: {
      return { error: action.payload.error }
    }
    default:
      return state
  }
}
