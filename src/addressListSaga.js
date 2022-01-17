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
    const { addresses } = yield call(serverGetAddressList)
    yield put(addressListSuccess(addresses))
  } catch (error) {
    yield put(addressListFailure(error.message))
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* addressListSaga() {
  yield takeEvery(GET_ADDRESS_LIST, addressList)
}
//====================================================================
