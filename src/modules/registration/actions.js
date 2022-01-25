export const GET_REGISTRATION = 'GET_REGISTRATION'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'

export const getRegistration = (email, password, name, surname) => ({
  type: GET_REGISTRATION,
  payload: { email, password, name, surname },
})
export const registrationSuccess = (success) => ({
  type: REGISTRATION_SUCCESS,
  payload: { success },
})
export const registrationFailure = (error) => ({
  type: REGISTRATION_FAILURE,
  payload: { error },
})