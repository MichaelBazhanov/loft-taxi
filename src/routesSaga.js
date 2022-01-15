import { serverGetRoutes } from './api'
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_ROUTES, routesSuccess, routesFailure } from './actions'
//======================================================= ТЕСТИРОВАНИЕ
export function* routes() {
  try {
    const { address1, address2 } = yield call(serverGetRoutes)
    yield put(routesSuccess(address1, address2))
  } catch (error) {
    yield put(routesFailure(error))
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* routesSaga() {
  yield takeEvery(GET_ROUTES, routes)
}
//====================================================================
