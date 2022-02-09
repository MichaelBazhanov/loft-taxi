//==================================================================================== БЛОК ПОЛУЧЕНИЯ ДОСТУПНЫХ МАРШРУТОВ
export const RESET_ROUTES_AND_ADDRESS = 'RESET_ROUTES_AND_ADDRESS'
export const GET_ROUTES_COORDINATES = 'GET_ROUTES_COORDINATES'
export const ROUTES_COORDINATES_SUCCESS = 'ROUTES_COORDINATES_SUCCESS'
export const ROUTES_COORDINATES_FAILURE = 'ROUTES_COORDINATES_FAILURE'

export const resetRoutesAndAddress = () => ({
  type: RESET_ROUTES_AND_ADDRESS,
})
export const getRoutesCoordinates = (address1, address2) => ({
  type: GET_ROUTES_COORDINATES,
  payload: { address1, address2 },
})
export const routesCoordinatesSuccess = (coordinates) => ({
  type: ROUTES_COORDINATES_SUCCESS,
  payload: { coordinates },
})
export const routesCoordinatesFailure = (error) => ({
  type: ROUTES_COORDINATES_FAILURE,
  payload: { error },
})