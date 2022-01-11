export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const logIn = (token) => ({
  type: LOG_IN,
  payload: { token },
})
export const logOut = () => ({
  type: LOG_OUT,
})
export const authenticate = (email, password) => ({
  type: AUTHENTICATE,
  payload: { email, password },
})
//====================================================================================
export const SEND_FORM_CARD = 'SEND_FORM_CARD'
export const SEND_CARD_SUCCESS = 'SEND_CARD_SUCCESS'
export const SEND_CARD_FAILURE = 'SEND_CARD_FAILURE'

export const sendFormCard = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: SEND_FORM_CARD,
  payload: { cardName, cardNumber, expiryDate, cvc, token },
})
export const sendCardSuccess = () => ({
  type: SEND_CARD_SUCCESS,
})
export const sendCardFailure = () => ({
  type: SEND_CARD_FAILURE,
})
//====================================================================================
export const GET_FORM_CARD = 'GET_FORM_CARD'
export const GET_CARD_SUCCESS = 'GET_CARD_SUCCESS'
export const GET_CARD_FAILURE = 'GET_CARD_FAILURE'

export const getFormCard = () => ({
  type: GET_FORM_CARD,
})
export const getCardSuccess = (cardName, cardNumber, expiryDate, cvc, id) => ({
  type: GET_CARD_SUCCESS,
  payload: { cardName, cardNumber, expiryDate, cvc, id },
})
export const getCardFailure = () => ({
  type: GET_CARD_FAILURE,
})
