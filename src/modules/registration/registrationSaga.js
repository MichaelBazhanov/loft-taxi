import {
  GET_REGISTRATION,
  registrationSuccess,
  registrationFailure,
} from './actions'
import { logIn } from '../authorization'
import { serverRegistration } from '../../api'
import { call, takeEvery, put } from 'redux-saga/effects'
import { showNotification } from '../tooltips'

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
      yield put(
        showNotification({ type: 'success', text: 'Registration success !' }),
      ) // notification
    } else {
      yield put(registrationFailure(error))
      yield put(
        showNotification({ type: 'error', text: error }),
      ) // notification
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
