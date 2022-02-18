import { AUTHENTICATE, logIn, logInFailure } from './actions'
import { serverLogin } from '../../api'
import { call, takeEvery, put } from 'redux-saga/effects'
import { showNotification } from '../tooltips'

//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================
//Сага authenticateSaga принимает Action
export function* authenticateSaga(action) {
  try {
    const { email, password } = action.payload //вынимаем данные из ACTION

    const { success, token, error } = yield call(serverLogin, email, password)

    if (success) {
      yield put(logIn(token)) // dispatch logIn с payload: token (ЭТУ ЧАСТЬ И ЛОВИМ В ТЕСТАХ!!!! {type: 'LIG_IN'})
      yield put(
        showNotification({ type: 'success', text: 'Authenticate success !' }),
      ) // notification
    } else {
      yield put(logInFailure(error))
      yield put(
        showNotification({ type: 'error', text: error }),
      ) // notification
    }
  } catch (error) {
    console.error(error.message)
    yield put(logInFailure(error.response))
  }
}
//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================

export function* authorizationSaga() {
  yield takeEvery(AUTHENTICATE, authenticateSaga) // следим за Action и запускаем Saga
}
