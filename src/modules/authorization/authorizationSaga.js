import { AUTHENTICATE, logIn, logInFailure } from './actions'
import { serverLogin } from '../../api'
import { call, takeEvery, put } from 'redux-saga/effects'

//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================
//Сага authenticateSaga принимает Action
export function* authenticateSaga(action) {
  try {
    const { email, password } = action.payload //вынимаем данные из ACTION

    const { success, token, error } = yield call(serverLogin, email, password)
    console.log(success, token, error)

    if (success) {
      yield put(logIn(token)) // dispatch logIn с payload: token (ЭТУ ЧАСТЬ И ЛОВИМ В ТЕСТАХ!!!! {type: 'LIG_IN'})
    } else {
      yield put(logInFailure(error))
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
