export const SEND_FORM_CARD = 'SEND_FORM_CARD'

export const sendFormCard = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: SEND_FORM_CARD,
  payload: { cardName, cardNumber, expiryDate, cvc, token },
})
