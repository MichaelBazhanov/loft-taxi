import { recordSaga } from '../recordSaga'
import { authenticateSaga } from '../authSaga'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { authenticate } from '../actions'

// jest.mock('../api', () => ({ serverLogin: jest.fn(() => true) }))

describe('authSaga', () => {
  describe('#AUTHENTICATE', () => {
    it('authenticate through api', async () => {
      const dispatched = await recordSaga(
        authenticateSaga, // сама сага для теста
        authenticate('testLogin', 'testPassword'), // отдаем action creator
      )

      console.log('В ТЕСТЕ #####################', dispatched)
      expect(dispatched).toEqual([
        {
          type: 'LOG_IN',
          payload: { token: '123' },
        },
      ])
      // toEqual - ожидаемый массив
    })
  })
})
