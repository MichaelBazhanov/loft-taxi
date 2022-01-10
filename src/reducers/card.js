import {
  SEND_FORM_CARD,
  SEND_CARD_SUCCESS,
  SEND_CARD_FAILURE,
  GET_FORM_CARD,
  GET_CARD_SUCCESS,
  GET_CARD_FAILURE,
} from '../actions'

const initialState = {
  cardName: 'Michael',
  cardNumber: '5545 2300 3432 4521',
  expiryDate: '2000-01-01',
  cvc: '999',
  token: 'test+token',
  cardSendStatus: '',
  cardGetStatus: '',
  id: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_FORM_CARD: {
      return { ...action.payload } // { cardNumber, expiryDate, cardName, cvc, token } = action.payload //возвращаем новый объект
    }
    case SEND_CARD_SUCCESS: {
      return { cardSendStatus: 'success' }
    }
    case SEND_CARD_FAILURE: {
      return { cardSendStatus: 'failure' }
    }
    // case GET_FORM_CARD: {
    //   return { ...action.payload }
    // }
    case GET_CARD_SUCCESS: {
      return {
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        cvc: action.payload.cvc,
        id: action.payload.id,
        cardGetStatus: 'success',
      }
    }
    case GET_CARD_FAILURE: {
      return { cardGetStatus: 'failure' }
    }

    default:
      return state
  }
}
// case GET_FORM_CARD: {
//   const obj = {
//     cardName: action.payload.cardName,
//     cardNumber: action.payload.cardNumber,
//     expiryDate: action.payload.expiryDate,
//     cvc: action.payload.cvc,
//     id: action.payload.id,
//     cardGetStatus: 'success',
//   }
//   return obj
// }