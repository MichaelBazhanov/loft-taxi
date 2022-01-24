import {
  GET_PAYMENT_CARD,
  GET_PAYMENT_CARD_SUCCESS,
  GET_PAYMENT_CARD_FAILURE,
  SEND_PAYMENT_CARD,
  SEND_PAYMENT_CARD_SUCCESS,
  SEND_PAYMENT_CARD_FAILURE,
  SEND_PAYMENT_CARD_NEW_USER,
  SEND_PAYMENT_CARD_NEW_USER_SUCCESS,
  SEND_PAYMENT_CARD_NEW_USER_FAILURE,
} from './actions'

const initialState = {
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  id: '',
  //get
  isLoadingGetPaymentCard: false,
  errorGetPaymentCard: null,
  //send
  isLoadingSendPaymentCard: false,
  errorSendPaymentCard: null,
  //send new user
  isLoadingSendPaymentCardNewUser: false,
  errorSendPaymentCardNewUser: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    // ================================================== Получение карты
    case GET_PAYMENT_CARD: {
      return {
        ...state,
        isLoadingGetPaymentCard: true,
      }
    }

    case GET_PAYMENT_CARD_SUCCESS: {
      return {
        ...state,
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        cvc: action.payload.cvc,
        id: action.payload.id,
        isLoadingGetPaymentCard: false,
      }
    }

    case GET_PAYMENT_CARD_FAILURE: {
      return {
        ...state,
        isLoadingGetPaymentCard: false,
        errorGetPaymentCard: action.payload.error,
      }
    }
    // ================================================== Установка карты
    case SEND_PAYMENT_CARD: {
      return {
        ...state,
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        cvc: action.payload.cvc,
        isLoadingSendPaymentCard: true,
      }
    }

    case SEND_PAYMENT_CARD_SUCCESS: {
      return {
        ...state,
        isLoadingSendPaymentCard: false,
      }
    }

    case SEND_PAYMENT_CARD_FAILURE: {
      return {
        ...state,
        isLoadingSendPaymentCard: false,
        errorSendPaymentCard: action.payload.error,
      }
    }
    // ================================================== Установка карты для нового пользователя
    case SEND_PAYMENT_CARD_NEW_USER: {
      return {
        ...state,
        isLoadingSendPaymentCardNewUser: true,
      }
    }

    case SEND_PAYMENT_CARD_NEW_USER_SUCCESS: {
      return {
        ...state,
        isLoadingSendPaymentCardNewUser: false,
      }
    }

    case SEND_PAYMENT_CARD_NEW_USER_FAILURE: {
      return {
        ...state,
        isLoadingSendPaymentCardNewUser: false,
        errorSendPaymentCardNewUser: action.payload.error,
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    default:
      return state
  }
}
