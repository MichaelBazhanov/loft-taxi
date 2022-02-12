import { recordSaga } from '../recordSaga'
import { authenticateSaga } from '../modules/authorization'
import { serverLogin } from '../api'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { authenticate } from '../modules/authorization'

// jest.mock('../api', () => ({ serverLogin: jest.fn(() => true) }))
jest.mock('../api') //Мы мокаем api для того что бы была доступна функция serverLogin внутри теста

describe('authorizationSaga', () => {
  describe('#AUTHENTICATE', () => {
    it('Авторизоваться через api', async () => {

      serverLogin.mockImplementation(async () => ({ //serverLogin используется внутри authenticateSaga
        success: true,
        token: '123',
      }))

      const dispatched = await recordSaga(
        authenticateSaga, // сама сага
        authenticate('testLogin', 'testPassword'), // action на который тригерим эту сагу
      )

      expect(dispatched).toEqual([
        {
          type: 'LOG_IN',
          payload: { token: '123' },
        },
        {
          type: 'SHOW_NOTIFICATION',
          payload: { text: 'Authenticate success !', type: 'success' },
        },
      ])
    })
    // ===============================================================================================
    it('Авторизоваться через api с неверными данными', async () => {

      serverLogin.mockImplementation(async () => ({ //serverLogin используется внутри authenticateSaga
        success: false,
        error: 'error',
      }))

      const dispatched = await recordSaga(
        authenticateSaga, // сама сага для теста
        authenticate('testLogin', 'testPassword'), // отдаем action creator
      )

      expect(dispatched).toEqual([
        {
          type: 'LOG_IN_FAILURE',
          payload: { error: 'error' },
        },
        {
          type: 'SHOW_NOTIFICATION',
          payload: { text: 'error', type: 'error' },
        },
      ])
    })
  })
})
