import { recordSaga } from '../recordSaga'
import { addressList } from '../modules/address'
import { serverGetAddressList } from '../api'

//Это ACTION с которого начинается исполнение SAGA (this action creator)
import { getAddressList } from '../modules/address'

// jest.mock('../api', () => ({ serverGetAddressList: jest.fn(() => true) }))
jest.mock('../api') //Мы мокаем api для того что бы была доступна функция serverGetAddressList внутри теста

describe('addressListSaga', () => {
  describe('#GET_ADDRESS_LIST', () => {
    it('Получение адресов через api', async () => {

      serverGetAddressList.mockImplementation(async () => ({ //serverGetAddressList используется внутри addressList
        addresses: ['Адрес 1', 'Адрес 2'],
      }))

      const dispatched = await recordSaga(
        addressList, // сама сага
        getAddressList(), // action на который тригерим эту сагу
      )

      expect(dispatched).toEqual([
        {
          type: 'ADDRESS_LIST_SUCCESS',
          payload: {
            address: [
              { id: 1,  rout: "Адрес 1",},
              { id: 2,  rout: "Адрес 2",}
            ]
          },
        },
      ])
    })
    // ===============================================================================================
    it('Получение адресов через api с неверными данными', async () => {

      serverGetAddressList.mockImplementation(async () => ({ //serverGetAddressList используется внутри addressList
        addresses_figny: [] // test: 'Пришел не адрес а фигня !',
      }))

      const dispatched = await recordSaga(
        addressList, // сама сага
        getAddressList(), // action на который тригерим эту сагу
      )

      expect(dispatched).toEqual([
        {
          type: 'ADDRESS_LIST_FAILURE',
          payload: { error: 'error' },
        },
      ])
    })
    // ===============================================================================================
    it('Критическая ошибка', async () => {

      serverGetAddressList.mockImplementation(async () => {throw new Error()}) //throw new Error({message: 'error'})

      const dispatched = await recordSaga(
        addressList, // сама сага
        getAddressList(), // action на который тригерим эту сагу
      )

      expect(dispatched).toEqual([
        {
          type: 'ADDRESS_LIST_FAILURE',
          payload: { error: undefined },
        },
      ])
    })
  })
})
