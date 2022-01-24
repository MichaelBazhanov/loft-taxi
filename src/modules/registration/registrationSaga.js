import {
  GET_REGISTRATION,
  registrationSuccess,
  registrationFailure,
} from './actions'
import { logIn } from '../authorization'
import { sendPaymentCard } from '../payment'
import { serverRegistration } from '../../api'
import { call, takeEvery, put } from 'redux-saga/effects'

//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================
export function* registration(action) {
  try {
    const { email, password, name, surname } = action.payload

    const { success, token, error } = yield call(
      serverRegistration,
      email,
      password,
      name,
      surname,
    )
    if (success) {
      yield put(logIn(token))
      yield put(registrationSuccess(success))
      // При регистрации нового пользователя устанавливаем ему пустую платежную карту
      // yield put(sendPaymentCard())

    } else {
      yield put(registrationFailure(error))
    }
  } catch (error) {
    console.error(error.message)
    yield put(registrationFailure(error.response))
  }
}
//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================

export function* registrationSaga() {
  yield takeEvery(GET_REGISTRATION, registration) // следим за Action и запускаем Saga
}
