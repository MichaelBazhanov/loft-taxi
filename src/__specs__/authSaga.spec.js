import { recordSaga } from '../recordSaga'
import { authenticateSaga } from '../authSaga'
import { serverLogin } from '../api'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { authenticate } from '../actions'

// jest.mock('../api', () => ({ serverLogin: jest.fn(() => true) }))
jest.mock('../api')

describe('authSaga', () => {
  describe('#AUTHENTICATE', () => {
    it('authenticate through api', async () => {

      serverLogin.mockImplementation(async () => ({ //serverLogin используется внутри authenticateSaga
        success: true,
        token: '123',
      }))

      const dispatched = await recordSaga(
        authenticateSaga, // сама сага для теста
        authenticate('testLogin', 'testPassword'), // отдаем action creator
      )

      expect(dispatched).toEqual([
        {
          type: 'LOG_IN',
          payload: { token: '123' },
        },
      ])
    })
  })
})
