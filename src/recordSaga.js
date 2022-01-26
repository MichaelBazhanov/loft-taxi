//это Helper упрощает тестирование saga
// Helper будит записывать все ACTIONS который dispatch SAGA
//     и после этого проварить массив ACTION который она вернет будит соответствовать тому что мы ожидаем

import { runSaga } from 'redux-saga'

export const recordSaga = async (saga, initialAction = null) => { //console.log('######### saga, initialAction ',saga, initialAction)
  // saga - принимает сагу для тестирования
  // initialAction - экшен c которым сага должна запуститься
  const dispatched = [] // Хранит Action которые Saga задиспатчит в процессе свой работы

  await runSaga(
    //запускаем сагу с параметрами и копим массив
    {
      //вместо настоящего dispatch записываем action в массив
      dispatch: (action) => dispatched.push(action), // сам action это реальный action с payload данными
      //dispatch: срабатывает каждый раз когда в саге срабатывает yield put() те сначала put срабатывает в саге а потом приходит сюда в виде dispatch
      // те dispatch это put(action) для того что бы все это в reducer Не уходило мы заменяем
    },
    saga, // сага для теста (в этой саге ожидаем диспатчи других action и записываем их)
    initialAction, // Action для саги для теста
  ).done

  return dispatched // возвращаем массив задиспатченных экшенов
}

//Общий смысл
// Запускаем recordSaga с нужным нам ACTION и после этого убедиться что те ACTION которые она задиспатчит соответствуют нужным нам
//--------
//ОТдаем сагу и смотрим какие action она запускает и сравниваем с теми что должны запускаться
// Например / authSaga должна задиспатчить action login