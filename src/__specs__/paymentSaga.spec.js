import { recordSaga } from '../recordSaga'
import { gettingCard } from '../modules/payment' //это должна быть не сага обертка а сама сага
import { serverGetCard } from '../api'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { getPaymentCard } from '../modules/payment'

// jest.mock('../api', () => ({ serverRegistration: jest.fn(() => true) }))
jest.mock('../api') //Мы мокаем api для того что бы была доступна функция serverRegistration внутри теста

describe('gettingCard', () => {
  describe('#GET_PAYMENT_CARD', () => {
    it('Получение карты отплаты через api', async () => {
      //serverGetCard используется внутри gettingCard
      serverGetCard.mockImplementation(async () => ({
        cardName: 'cardName',
        cardNumber: 'cardNumber',
        expiryDate: 'expiryDate',
        cvc: '000',
        id: '0',
        error: 'true',
      }))

      const dispatched = await recordSaga(
        gettingCard, // сама сага
        getPaymentCard(), // action на который тригерим эту сагу
      )
      console.log(dispatched)
      expect(dispatched).toEqual([
        // { type: 'LOG_IN', payload: { token: '123' } },
        // { type: 'REGISTRATION_SUCCESS', payload: { success: true } },
      ])
    })
    // ===============================================================================================
    // it('Регистрация нового пользователя через api с неверными данными', async () => {

    //   serverRegistration.mockImplementation(async () => ({ //serverRegistration используется внутри authenticateSaga
    //     success: false,
    //     error: 'error',
    //   }))

    //   const dispatched = await recordSaga(
    //     registration, // сама сага для теста
    //     getRegistration('testEmail', 'testPassword', 'testName', 'testSurname'), // action на который тригерим эту сагу
    //   )

    //   expect(dispatched).toEqual([
    //     {
    //       type: 'REGISTRATION_FAILURE',
    //       payload: { error: 'error' },
    //     },
    //   ])
    // })
  })
})
