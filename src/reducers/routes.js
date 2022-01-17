import {
  ROUTES_SUCCESS,
  ROUTES_FAILURE,
  GET_ROUTES_COORDINATES,
  ROUT_ADDRESS1,
  ROUT_ADDRESS2,
} from '../actions'

const initialState = {
  address1: null,
  address2: null,
  error: null,
  coordinates: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROUTES_COORDINATES: {
      return {
        coordinates: action.payload.coordinates,
        address1: null,
        address2: null,
        error: null,
      }
    }
    // case ROUTES_SUCCESS: {
    //   return {
    //     address1: action.payload.address1,
    //     address2: action.payload.address2,
    //   }
    // }
    case ROUT_ADDRESS1: {
      return {
        ...state,
        address1: action.payload.address1,
      }
    }
    case ROUT_ADDRESS2: {
      return {
        ...state,
        address2: action.payload.address2,
      }
    }
    case ROUTES_FAILURE: {
      return {
        error: action.payload.error,
        coordinates: null,
        address1: null,
        address2: null,
      }
    }
    default:
      return state
  }
}
