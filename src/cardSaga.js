import {
  sendCardSuccess,
  sendCardFailure,
  getCardSuccess,
  getCardFailure,
} from './actions' //просто actions для одного параметра
import { SEND_FORM_CARD, GET_FORM_CARD } from './actions' //dispatch из компонента
import { serverSendCard, serverGetCard } from './api'

import { call, put, select, takeEvery } from 'redux-saga/effects'
//===========================================================================================================
const getToken = (state) => state.authorizationReducer.token

// возвращает token redux
export function* checkToken() {
  return yield select(getToken)
}
//===========================================================================================================
export function* sendingCard(action) {
  const token = yield call(checkToken)

  const { cardName, cardNumber, expiryDate, cvc } = action.payload //вынимаем данные из ACTION
  const success = yield call(
    serverSendCard,
    cardName,
    cardNumber,
    expiryDate,
    cvc,
    token,
  )

  if (success) {
    yield put(sendCardSuccess())
  } else {
    yield put(sendCardFailure())
  }
}

export function* cardSend() {
  yield takeEvery(SEND_FORM_CARD, sendingCard)
}
//===========================================================================================================
export function* gettingCard() {
  const token = yield call(checkToken)

  const { cardName, cardNumber, expiryDate, cvc, id } = yield call(
    serverGetCard,
    token,
  )

  if (token) {
    yield put(getCardSuccess(cardName, cardNumber, expiryDate, cvc, id))
  } else {
    yield put(getCardFailure())
  }
}

export function* cardGet() {
  yield takeEvery(GET_FORM_CARD, gettingCard)
}
//===========================================================================================================
