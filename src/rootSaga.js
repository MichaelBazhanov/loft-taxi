import { all, fork } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { cardSend, cardGet } from './cardSaga'

export function* rootSaga() {
  yield all([
    fork(authSaga), //// saga - сага авторизации
    fork(cardSend), //// saga - сага отправки карты
    fork(cardGet), //// saga - сага получения карты
  ])
}
