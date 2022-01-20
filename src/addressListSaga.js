import { serverGetAddressList } from './api'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_ADDRESS_LIST,
  addressListSuccess,
  addressListFailure,
} from './actions'
//======================================================= ТЕСТИРОВАНИЕ
export function* addressList() {
  try {
    let { addresses } = yield call(serverGetAddressList)
    // перерабатываем данные у удобном для нас виде ======
    addresses = addresses.map((el, inx) => {
      return { id: inx + 1, rout: el }
    })
    // перерабатываем данные у удобном для нас виде ======
    yield put(addressListSuccess(addresses))
  } catch (error) {
    console.error(error.message)
    yield put(addressListFailure(error.message))
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* addressListSaga() {
  yield takeEvery(GET_ADDRESS_LIST, addressList)
}
//====================================================================
