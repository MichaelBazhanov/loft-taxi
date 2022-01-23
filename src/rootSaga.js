import { all, fork } from 'redux-saga/effects'
// import { authSaga } from './authSaga'
import { cardSend, cardGet } from './cardSaga'
import { addressListSaga } from './addressListSaga'
import { routesSaga } from './routesSaga'

import { registrationSaga } from './modules/registration'
import { authorizationSaga } from './modules/authorization'

export function* rootSaga() {
  yield all([
    // fork(authSaga), // saga - сага авторизации
    fork(cardSend), // saga - сага отправки карты
    fork(cardGet), // saga - сага получения карты
    fork(addressListSaga), // saga - сага получения адресов
    fork(routesSaga), // saga - сага получения маршрутов

    fork(registrationSaga), // saga - сага регистрации
    fork(authorizationSaga), // saga - сага авторизации
  ])

  // yield fork(authSaga) // равнозначность
  // yield fork(cardSend) // равнозначность
}
