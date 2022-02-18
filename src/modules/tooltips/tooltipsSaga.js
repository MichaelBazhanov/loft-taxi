import { put, takeEvery, delay } from 'redux-saga/effects'
import { SHOW_NOTIFICATION, hideNotification } from './actions'
//======================================================= ТЕСТИРОВАНИЕ
export function* showFunc() {
  yield delay(2000)
  yield put(hideNotification())
}
//======================================================= ТЕСТИРОВАНИЕ
export function* tooltipsSaga() {
  yield takeEvery(SHOW_NOTIFICATION, showFunc)
}
//====================================================================
