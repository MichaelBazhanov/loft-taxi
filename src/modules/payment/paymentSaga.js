import {
  getPaymentCardSuccess,
  getPaymentCardFailure,
  sendPaymentCardSuccess,
  sendPaymentCardFailure,
  sendPaymentCardNewUserSuccess,
  sendPaymentCardNewUserFailure,
} from './actions' // Эти actions диспатсчим
import {
  SEND_PAYMENT_CARD,
  GET_PAYMENT_CARD,
  SEND_PAYMENT_CARD_NEW_USER,
} from './actions' // За этими actions следим
import { serverSendCard, serverGetCard } from '../../api'

import { call, put, select, takeEvery } from 'redux-saga/effects'
//===========================================================================================================
const getToken = (state) => state.authorizationReducer.token

// возвращает token redux
export function* checkToken() {
  return yield select(getToken)
}

//============================================================================================Установка карты
export function* sendingCard(action) {
  try {
    const token = yield call(checkToken)

    const { cardName, cardNumber, expiryDate, cvc } = action.payload //вынимаем данные из ACTION
    const { success, error } = yield call(
      serverSendCard,
      cardName,
      cardNumber,
      expiryDate,
      cvc,
      token,
    )

    if (success) {
      yield put(sendPaymentCardSuccess())
    } else {
      yield put(sendPaymentCardFailure(error))
    }
  } catch (error) {
    console.error(error.message)
    yield put(sendPaymentCardFailure(error.response))
  }
}

export function* paymentCardSendSaga() {
  yield takeEvery(SEND_PAYMENT_CARD, sendingCard)
}

//==========================================================================================Получение карты
export function* gettingCard() {
  const token = yield call(checkToken)

  // const response= yield call(
  //   serverGetCard,
  //   token,
  // )
  // console.log(response)
  const { cardName, cardNumber, expiryDate, cvc, id } = yield call(
    serverGetCard,
    token,
  )

  if (token) {
    yield put(getPaymentCardSuccess(cardName, cardNumber, expiryDate, cvc, id))
  } else {
    yield put(getPaymentCardFailure())
  }
}

export function* paymentCardGetSaga() {
  yield takeEvery(GET_PAYMENT_CARD, gettingCard)
}

//===========================================================Установка карты для нового пользователя
export function* sendingCardNewUser() {
  try {
    const token = yield call(checkToken)

    // default object
    const paymentCardNewUser = {
      cardName: ' ',
      cardNumber: ' ',
      expiryDate: ' ',
      cvc: ' ',
    }
    const { cardName, cardNumber, expiryDate, cvc } = paymentCardNewUser

    const { success, error } = yield call(
      serverSendCard,
      cardName,
      cardNumber,
      expiryDate,
      cvc,
      token,
    )

    if (success) {
      yield put(sendPaymentCardNewUserSuccess())
    } else {
			console.error(error)
      yield put(sendPaymentCardNewUserFailure(error))
    }
  } catch (error) {
    console.error(error.message)
    yield put(sendPaymentCardNewUserFailure(error.response))
  }
}

export function* paymentCardSendNewUserSaga() {
  yield takeEvery(SEND_PAYMENT_CARD_NEW_USER, sendingCardNewUser)
}
