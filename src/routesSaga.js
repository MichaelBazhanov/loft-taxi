import { serverGetRoutes } from './api'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  GET_ROUTES,
  routesFailure,
  getRoutesCoordinates,
} from './actions'
//======================================================= ТЕСТИРОВАНИЕ
const getAddress1 = (state) => state.routes.address1 // это селектор и он берет данные из STORE
const getAddress2 = (state) => state.routes.address2 // это селектор и он берет данные из STORE

function* checkout() {
  const address1 = yield select(getAddress1)
  const address2 = yield select(getAddress2)
  return { address1, address2 }
}
export function* routes() {
  try {
    const { address1, address2 } = yield call(checkout)
    const coordinates = yield call(serverGetRoutes, address1, address2) // получаем координаты по 2ум адресам
    yield put(getRoutesCoordinates(coordinates))
  } catch (error) {
    yield put(routesFailure(error))
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* routesSaga() {
  yield takeEvery(GET_ROUTES, routes)
}
//====================================================================
