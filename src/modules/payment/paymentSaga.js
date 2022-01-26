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
    const { cardName, cardNumber, expiryDate, cvc, token } = action.payload //вынимаем данные из ACTION
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
//===========================================================================На тестирование ==============
export function* gettingCard(action) {
	try {
    const token = action.payload.token

		const { cardName, cardNumber, expiryDate, cvc, id, error } = yield call(
			serverGetCard,
			token,
		)
		if (token) {
			yield put(getPaymentCardSuccess(cardName, cardNumber, expiryDate, cvc, id))
		} else {
			yield put(getPaymentCardFailure(error))
		}
	} catch (error) {
		console.error(error.message)
    yield put(getPaymentCardFailure(error.response))
	}
}
//===========================================================================На тестирование ==============
export function* paymentCardGetSaga() {
  yield takeEvery(GET_PAYMENT_CARD, gettingCard)
}
//==========================================================================================Получение карты


//===========================================================Установка карты для нового пользователя
export function* sendingCardNewUser(action) {
  try {
    // default object
    const paymentCardNewUser = {
      cardName: ' ',
      cardNumber: ' ',
      expiryDate: ' ',
      cvc: ' ',
    }
    const { cardName, cardNumber, expiryDate, cvc, token = action.payload.token } = paymentCardNewUser

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
