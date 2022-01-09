import { formCardSuccess, formCardFailure } from './actions' //просто actions для одного параметра
import { SEND_FORM_CARD } from './actions' //dispatch из компонента
import { serverCard } from './api'

export const cardMiddleware = (store) => (next) => async (action) => {
  //все что здесь называется sideEffect=======================
  if (action.type === SEND_FORM_CARD) {
    const tokenLS = localStorage.getItem('token') //пытаемся получить данные

    if (tokenLS) {
      action.payload['token'] = tokenLS //добавляем token в action

      const { cardName, cardNumber, expiryDate, cvc, token } = action.payload //вынимаем данные из ACTION
      const success = await serverCard(
        cardName,
        cardNumber,
        expiryDate,
        cvc,
        token,
      )
      if (success) {
        store.dispatch(formCardSuccess())
      } else {
        store.dispatch(formCardFailure())
      }
    }
  } else {
    next(action) // пробрасываем следующий Middleware c action
  }
}
