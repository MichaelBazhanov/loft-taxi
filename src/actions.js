export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const logIn = () => ({
  type: LOG_IN,
})
export const logOut = () => ({
  type: LOG_OUT,
})
export const authenticate = (email, password) => ({
  type: AUTHENTICATE,
  payload: { email, password },
})

export const SEND_FORM_CARD = 'SEND_FORM_CARD'
export const FORM_CARD_SUCCESS = 'FORM_CARD_SUCCESS'
export const FORM_CARD_FAILURE = 'FORM_CARD_FAILURE'

export const sendFormCard = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: SEND_FORM_CARD,
  payload: { cardName, cardNumber, expiryDate, cvc, token },
})
export const formCardSuccess = () => ({
  type: FORM_CARD_SUCCESS,
})
export const formCardFailure = () => ({
  type: FORM_CARD_FAILURE,
})
