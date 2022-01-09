import {
  SEND_FORM_CARD,
  FORM_CARD_SUCCESS,
  FORM_CARD_FAILURE,
} from '../actions'

const initialState = {
  cardName: 'Michael',
  cardNumber: '5545 2300 3432 4521',
  expiryDate: '2000-01-01',
  cvc: '999',
  token: 'test+token',
  cardSendStatus: '',
  cardGetStatus: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_FORM_CARD: {
      console.log('Обработка данных в редьюсрее', { ...action.payload })
      return { ...action.payload } // { cardNumber, expiryDate, cardName, cvc, token } = action.payload //возвращаем новый объект
    }
    case FORM_CARD_SUCCESS: {
      return { cardSendStatus: 'success' }
    }
    case FORM_CARD_FAILURE: {
      return { cardSendStatus: 'failure' }
    }

    default:
      return state
  }
}
