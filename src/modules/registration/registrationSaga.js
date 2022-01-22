import {
  GET_REGISTRATION,
  registrationSuccess,
  registrationFailure,
} from './actions'
import { serverRegistration } from '../../api'
import { call, takeEvery, put } from 'redux-saga/effects'

//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================
export function* registration(action) {
  try {
    const { email, password, name } = action.payload

    const { success, token, error } = yield call(
      serverRegistration,
      email,
      password,
      name,
    )
    if (success) {
      yield put(registrationSuccess(success, token))
    } else {
      yield put(registrationFailure(error))
    }
  } catch (error) {
    console.error(error.message)
    yield put(registrationFailure(error.response))
  }
}
//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================

export function* authSaga() {
  yield takeEvery(GET_REGISTRATION, registration) // следим за Action и запускаем Saga
}
