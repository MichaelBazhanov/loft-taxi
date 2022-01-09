import { SEND_FORM_CARD } from './actions'

const initialState = {
  cardName: 'Michael',
  cardNumber: '5545 2300 3432 4521',
  expiryDate: '2000-01-01',
  cvc: '999',
  token: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_FORM_CARD:
      return { ...action.payload } // { cardNumber, expiryDate, cardName, cvc, token } = action.payload //возвращаем новый объект

    default:
      return state
  }
}
