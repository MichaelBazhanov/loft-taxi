//==================================================================================== БЛОК АВТОРИЗАЦИИ
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
  // dispatch из компонента logIn (ЭТОТ ТИП В reducers не обрабатывается)
  type: AUTHENTICATE,
  payload: { email, password },
})
//==================================================================================== БЛОК ОТПРАВКИ КАРТЫ
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
//==================================================================================== БЛОК ПОЛУЧЕНИЯ КАРТЫ
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
//==================================================================================== БЛОК ПОЛУЧЕНИЯ ДОСТУПНЫХ АДРЕСОВ
export const GET_ADDRESS_LIST = 'GET_ADDRESS_LIST'
export const ADDRESS_LIST_SUCCESS = 'ADDRESS_LIST_SUCCESS'
export const ADDRESS_LIST_FAILURE = 'ADDRESS_LIST_FAILURE'

export const getAddressList = () => ({
  type: GET_ADDRESS_LIST,
})
export const addressListSuccess = (address) => ({
  type: ADDRESS_LIST_SUCCESS,
  payload: { address },
})
export const addressListFailure = (error) => ({
  type: ADDRESS_LIST_FAILURE,
  payload: { error },
})
//==================================================================================== БЛОК ПОЛУЧЕНИЯ ДОСТУПНЫХ МАРШРУТОВ
export const GET_ROUTES = 'GET_ROUTES'
export const GET_ROUTES_COORDINATES = 'GET_ROUTES_COORDINATES'
// export const ROUTES_SUCCESS = 'GET_ROUTES_SUCCESS'
export const ROUT_ADDRESS1 = 'ROUT_ADDRESS1'
export const ROUT_ADDRESS2 = 'ROUT_ADDRESS2'
export const ROUTES_FAILURE = 'GET_ROUTES_FAILURE'

export const getRoutes = () => ({
  type: GET_ROUTES,
})
export const getRoutesCoordinates = (coordinates) => ({
  type: GET_ROUTES_COORDINATES,
  payload: { coordinates },
})
export const routAddress1 = (address1) => ({
  type: ROUT_ADDRESS1,
  payload: { address1 },
})
export const routAddress2 = (address2) => ({
  type: ROUT_ADDRESS2,
  payload: { address2 },
})
// export const routesSuccess = (address1, address2) => ({
//   type: ROUTES_SUCCESS,
//   payload: { address1, address2 },
// })
export const routesFailure = (error) => ({
  type: ROUTES_FAILURE,
  payload: { error },
})
