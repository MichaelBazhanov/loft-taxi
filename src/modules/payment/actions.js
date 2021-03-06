//==================================================================================== БЛОК ПОЛУЧЕНИЯ КАРТЫ
export const GET_PAYMENT_CARD = 'GET_PAYMENT_CARD'
export const GET_PAYMENT_CARD_SUCCESS = 'GET_PAYMENT_CARD_SUCCESS'
export const GET_PAYMENT_CARD_FAILURE = 'GET_PAYMENT_CARD_FAILURE'

export const getPaymentCard = (token) => ({
	type: GET_PAYMENT_CARD,
	payload: { token },
})
export const getPaymentCardSuccess = (cardName, cardNumber, expiryDate, cvc, id) => ({
	type: GET_PAYMENT_CARD_SUCCESS,
	payload: { cardName, cardNumber, expiryDate, cvc, id },
})
export const getPaymentCardFailure = (error) => ({
	type: GET_PAYMENT_CARD_FAILURE,
	payload: { error },
})
//==================================================================================== БЛОК ОТПРАВКИ КАРТЫ
export const SEND_PAYMENT_CARD = 'SEND_PAYMENT_CARD'
export const SEND_PAYMENT_CARD_SUCCESS = 'SEND_PAYMENT_CARD_SUCCESS'
export const SEND_PAYMENT_CARD_FAILURE = 'SEND_PAYMENT_CARD_FAILURE'

export const sendPaymentCard = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: SEND_PAYMENT_CARD,
  payload: { cardName, cardNumber, expiryDate, cvc, token },
})
export const sendPaymentCardSuccess = () => ({
  type: SEND_PAYMENT_CARD_SUCCESS,
})
export const sendPaymentCardFailure = (error) => ({
  type: SEND_PAYMENT_CARD_FAILURE,
	payload: { error },
})
//================================================================== БЛОК ОТПРАВКИ КАРТЫ НОВОГО ПОЛЬЗОВАТЕЛЯ
export const SEND_PAYMENT_CARD_NEW_USER = 'SEND_PAYMENT_CARD_NEW_USER'
export const SEND_PAYMENT_CARD_NEW_USER_SUCCESS = 'SEND_PAYMENT_CARD_NEW_USER_SUCCESS'
export const SEND_PAYMENT_CARD_NEW_USER_FAILURE = 'SEND_PAYMENT_CARD_NEW_USER_FAILURE'

export const sendPaymentCardNewUser = (token) => ({
	type: SEND_PAYMENT_CARD_NEW_USER,
	payload: { token },
})
export const sendPaymentCardNewUserSuccess = () => ({
  type: SEND_PAYMENT_CARD_NEW_USER_SUCCESS,
})
export const sendPaymentCardNewUserFailure = (error) => ({
  type: SEND_PAYMENT_CARD_NEW_USER_FAILURE,
	payload: { error },
})