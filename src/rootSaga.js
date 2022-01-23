import { all, fork } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { cardSend, cardGet } from './cardSaga'
import { addressListSaga } from './addressListSaga'
import { routesSaga } from './routesSaga'

export function* rootSaga() {
  yield all([
    fork(authSaga), // saga - сага авторизации
    fork(cardSend), // saga - сага отправки карты
    fork(cardGet), // saga - сага получения карты
    fork(addressListSaga), // saga - сага получения адресов
    fork(routesSaga), // saga - сага получения маршрутов
  ])
}
