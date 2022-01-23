import {
  sendCardSuccess,
  sendCardFailure,
  getCardSuccess,
  getCardFailure,
} from '../actions' //просто actions для одного параметра
import { SEND_FORM_CARD, GET_FORM_CARD } from '../actions' //dispatch из компонента
import { serverSendCard, serverGetCard } from '../api'

// Отправка данных карты на сервер
export const cardSendMiddleware = (store) => (next) => async (action) => {
  //все что здесь называется sideEffect=======================
  if (action.type === SEND_FORM_CARD) {
    const tokenLS = localStorage.getItem('token') //пытаемся получить данные

    if (tokenLS) {
      action.payload['token'] = tokenLS //добавляем token в action

      const { cardName, cardNumber, expiryDate, cvc, token } = action.payload //вынимаем данные из ACTION
      const success = await serverSendCard(
        cardName,
        cardNumber,
        expiryDate,
        cvc,
        token,
      )
      if (success) {
        store.dispatch(sendCardSuccess())
      } else {
        store.dispatch(sendCardFailure())
      }
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
// Получение данных карты на клиенте
export const cardGetMiddleware = (store) => (next) => async (action) => {
  //все что здесь называется sideEffect=======================
  if (action.type === GET_FORM_CARD) {
    const token = localStorage.getItem('token') //пытаемся получить данные

    if (token) {
      const { cardName, cardNumber, expiryDate, cvc, id } = await serverGetCard(
        token,
      )

      if (token) {
        store.dispatch(
          getCardSuccess(cardName, cardNumber, expiryDate, cvc, id),
        )
      } else {
        store.dispatch(getCardFailure())
      }
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
