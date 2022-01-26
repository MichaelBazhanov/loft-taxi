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
      }))

      const dispatched = await recordSaga(
        gettingCard, // сама сага
        getPaymentCard('123'), // action на который тригерит эту сагу ('123' это token)
      )
      // console.log(dispatched)
      expect(dispatched).toEqual([
        {
          type: 'GET_PAYMENT_CARD_SUCCESS',
          payload: {
            cardName: 'cardName',
            cardNumber: 'cardNumber',
            expiryDate: 'expiryDate',
            cvc: '000',
            id: '0',
          },
        },
      ])
    })
    // ===============================================================================================
    it('Получение карты отплаты через api с неверными данными', async () => {

      //serverGetCard используется внутри gettingCard
      serverGetCard.mockImplementation(async () => ({
        error: 'error'
      }))

      const dispatched = await recordSaga(
        gettingCard, // сама сага
        getPaymentCard(), // action на который тригерит эту сагу
      )
      // console.log(dispatched)
      expect(dispatched).toEqual([
        {
          type: 'GET_PAYMENT_CARD_FAILURE',
          payload: { error: 'error' },
        },
      ])
    })
  })
})
