// import {
//   GET_ROUTES_COORDINATES,
//   ROUTES_COORDINATES_SUCCESS,
//   ROUTES_COORDINATES_FAILURE,
// } from '../actions'

// const initialState = {
//   coordinates: [],
//   address1: null,
//   address2: null,
//   isLoading: false,
//   error: null,
// }

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case GET_ROUTES_COORDINATES: {
//       return {
//         ...state,
//         address1: action.payload.address1,
//         address2: action.payload.address2,
//         isLoading: true,
//         error: null,
//       }
//     }
//     case ROUTES_COORDINATES_SUCCESS: {
//       return {
//         ...state,
//         coordinates: action.payload.coordinates,
//       }
//     }
//     case ROUTES_COORDINATES_FAILURE: {
//       return {
//         ...state,
//         error: action.payload.error,
//         coordinates: null,
//       }
//     }
//     default:
//       return state
//   }
// }
