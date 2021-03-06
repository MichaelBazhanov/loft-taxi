import { serverGetRoutes } from '../../api'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_ROUTES_COORDINATES,
  routesCoordinatesSuccess,
  routesCoordinatesFailure,
} from './actions'
//======================================================= ТЕСТИРОВАНИЕ
export function* coordinates(action) {
  try {
    const { address1, address2 } = action.payload //вынимаем данные из ACTION
    const coordinates = yield call(serverGetRoutes, address1, address2) // получаем координаты по 2ум адресам

    if (Array.isArray(coordinates) && coordinates.length > 0 ) {
      yield put(routesCoordinatesSuccess(coordinates))
    } else {
      yield put(routesCoordinatesFailure(new Error('error').message))
    }
  } catch (error) {
    // console.error(error.message)
    yield put(routesCoordinatesFailure(error.response))
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* routesSaga() {
  yield takeEvery(GET_ROUTES_COORDINATES, coordinates)
}
//====================================================================
