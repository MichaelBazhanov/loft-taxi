import { AUTHENTICATE, logIn } from './actions'
import { serverLogin } from './api'
import { call, takeEvery, put } from 'redux-saga/effects'

//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================
//Сага authenticateSaga принимает Action
export function* authenticateSaga(action) {
  const { email, password } = action.payload //вынимаем данные из ACTION

  const response = yield call(serverLogin, email, password) // Успех
	if (response.success) {
    yield put(logIn(response.token)) // dispatch logIn с payload: token (ЭТУ ЧАСТЬ И ЛОВИМ В ТЕСТАХ!!!! {type: 'LIG_IN'})
  }
}
//========================================== ЭТА ЧАСТЬ ПОПАДАЕТ НА ТЕСТ!!! ==========================================

export function* authSaga() {
  yield takeEvery(AUTHENTICATE, authenticateSaga) // следим за Action и запускаем Saga
}
