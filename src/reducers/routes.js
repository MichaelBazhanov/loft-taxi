import { ROUTES_SUCCESS, ROUTES_FAILURE } from '../actions'

const initialState = {
  address1: null,
  address2: null,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ROUTES_SUCCESS: {
      return {
        address1: action.payload.address1,
        address2: action.payload.address2,
      }
    }
    case ROUTES_FAILURE: {
      return { error: action.payload.error }
    }
    default:
      return state
  }
}
