import { serverGetRoutes } from "../../api";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_ROUTES_COORDINATES,
  routesCoordinatesSuccess,
  routesCoordinatesFailure,
} from "./actions";
import { showNotification } from "../tooltips";
//======================================================= ТЕСТИРОВАНИЕ
export function* coordinates(action) {
  try {
    const { address1, address2 } = action.payload; //вынимаем данные из ACTION
    const coordinates = yield call(serverGetRoutes, address1, address2); // получаем координаты по 2ум адресам

    if (Array.isArray(coordinates) && coordinates && coordinates.length > 0) {
      yield put(routesCoordinatesSuccess(coordinates));
    } else {
      yield put(
        showNotification({
          type: "warning",
          text: "Внимание! Обнаружена ошибка построения адресов.",
        })
      ); // notification
      throw new Error("serverGetRoutes пришли необрабатываемые данные!");
    }
  } catch (error) {
    yield put(
      // routesCoordinatesFailure('error') // error для упрощения тестирования
      routesCoordinatesFailure({
        name: error.name,
        message: error.message,
        // stack: error.stack,
      })
    );
  }
}
//======================================================= ТЕСТИРОВАНИЕ
export function* routesSaga() {
  yield takeEvery(GET_ROUTES_COORDINATES, coordinates);
}
//====================================================================
