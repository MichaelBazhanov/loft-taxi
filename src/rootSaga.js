import { all, fork } from 'redux-saga/effects'

import { registrationSaga } from './modules/registration'
import { authorizationSaga } from './modules/authorization'
import { paymentCardGetSaga, paymentCardSendSaga, paymentCardSendNewUserSaga } from './modules/payment'
import { addressListSaga } from './modules/address'
import { routesSaga } from './modules/route'

export function* rootSaga() {
  yield all([
    fork(registrationSaga), // saga - сага регистрации
    fork(authorizationSaga), // saga - сага авторизации
    fork(paymentCardGetSaga), // saga - сага получения карты
    fork(paymentCardSendSaga), // saga - сага отправки карты
    fork(paymentCardSendNewUserSaga), // saga - сага отправки карты для нового пользователя
    fork(addressListSaga), // saga - сага получения адресов
    fork(routesSaga), // saga - сага получения маршрутов
  ])
  // yield fork(authSaga) // равнозначность
  // yield fork(cardSend) // равнозначность
}
