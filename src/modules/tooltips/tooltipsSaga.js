import { put, takeEvery, delay } from 'redux-saga/effects'
import { SHOW, hide } from './actions'
//======================================================= ТЕСТИРОВАНИЕ
export function* showFunc() {
  yield delay(2000)
  yield put(hide())
}
//======================================================= ТЕСТИРОВАНИЕ
export function* tooltipsSaga() {
  yield takeEvery(SHOW, showFunc)
}
//====================================================================
