import { authMiddleware } from '../authMiddleware'
import { authenticate } from '../actions'
import { serverLogin } from '../api'

//MOKI _ мокирование- поставление не настоящей функции serverLogin

jest.mock('../api', () => ({ serverLogin: jest.fn(() => true) })) //замокали весь файл
// 1 ПАРАМЕТР - мокаем модуль api по адресу ../api.js
// 2 ПАРАМЕТР - в качестве вывода функция которая возвращает serverLogin (её то мы и мокаем через Jest)
// ОБРАТИ ВНИМАНИЕ ЧТО ИЗ МОКА ФУНКЦИЯ ВОЗВРАЩАЕТ ПО УМОЛЧАНИЮ TRUE     jest.fn(() => true)
// Общий смысл в том что не важно что мы передадим в serverLogin в ответ же придет TRUE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// тестируем authMiddleware
describe('authMiddleware', () => {
  // тестируем конкретный action - AUTHENTICATE
  describe('#AUTHENTICATE', () => {
    //внутри нам нужно убедиться что он успешно авторизуется
    //authenticate through api = авторизоваться через апи
    it('authenticate through api', async () => {
      serverLogin.mockImplementation(async () => ({
        success: true,
        token: 123,
      })) // имплементация это ответ данной функции (serverLogin отдаем true)
      const dispatch = jest.fn() // это мок (фейковый stor)
      // передаем фейковый stor первым параметром dispatch
      //                        вторым next не нужен
      //                        третьим передаем наш action
      await authMiddleware
      ({ dispatch }) //store
      () // next
      (authenticate('test_email', 'test_password')) //action

      // ТЕПЕРЬ ОПИСЫВАЕМ ОЖИДАНИЯ ТЕСТА !!!================
      expect(serverLogin).toBeCalledWith('test_email', 'test_password') //это был вызван

      //также мы ожидаем что был вызван dispatch с методом logIn()
      expect(dispatch).toBeCalledWith({
        type: 'LOG_IN',
        payload: { token: 123 },
      })
    })

    describe('with wrong credentials', () => {
      //с неправильными учетными данными
      it('authenticates through api', async () => {
        serverLogin.mockImplementation(() => false) // имплементация это ответ данной функции (serverLogin отдаем true)
        const dispatch = jest.fn()

        await authMiddleware
        ({ dispatch }) // store
        () // next
        (authenticate('testlogin', 'testpassword')) // action

        expect(dispatch).not.toBeCalled()
      })
    })
  })
})
