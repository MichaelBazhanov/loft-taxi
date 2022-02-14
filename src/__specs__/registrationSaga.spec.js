import { recordSaga } from '../recordSaga'
import { registration } from '../modules/registration' //это должна быть не сага обертка а сама сага
import { serverRegistration } from '../api'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { getRegistration } from '../modules/registration'

// jest.mock('../api', () => ({ serverRegistration: jest.fn(() => true) }))
jest.mock('../api') //Мы мокаем api для того что бы была доступна функция serverRegistration внутри теста

describe('registration', () => {
  describe('#GET_REGISTRATION', () => {
    it('Регистрация нового пользователя через api', async () => {
      serverRegistration.mockImplementation(async () => ({
        //serverRegistration используется внутри registration
        success: true,
        token: '123',
      }))

      const dispatched = await recordSaga(
        registration, // сама сага
        getRegistration('testEmail', 'testPassword', 'testName', 'testSurname'), // action на который тригерим эту сагу
      )
      // console.log(dispatched)
      expect(dispatched).toEqual([
        { type: 'LOG_IN', payload: { token: '123' } },
        { type: 'REGISTRATION_SUCCESS', payload: { success: true } },
      ])
    })
    // ===============================================================================================
    it('Регистрация нового пользователя через api с неверными данными', async () => {

      serverRegistration.mockImplementation(async () => ({ //serverRegistration используется внутри authenticateSaga
        success: false,
        error: 'error',
      }))

      const dispatched = await recordSaga(
        registration, // сама сага для теста
        getRegistration('testEmail', 'testPassword', 'testName', 'testSurname'), // action на который тригерим эту сагу
      )

      expect(dispatched).toEqual([
        {
          type: 'REGISTRATION_FAILURE',
          payload: { error: 'error' },
        },
      ])
    })
  })
})
