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