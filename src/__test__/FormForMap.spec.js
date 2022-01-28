import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import FormForMap from '../components/FormForMap'

// Мокаем useNavigate что бы внутри <FormForMap /> отдал просто функцию
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: { token: '123' },

    // address: ['1','2'],
    addressReducer: {
      address: [
        { id: 1, root: 'Адрес 1' },
        { id: 2, root: 'Адрес 2' },
      ],
    },
    addressReducer: { isLoading: false },
    addressReducer: { error: false },

    paymentReducer: { cardName: 'test' },
    paymentReducer: { cardNumber: '1' },
    paymentReducer: { expiryDate: '000' },
    paymentReducer: { cvc: '1' },

    paymentReducer: { isLoadingSendPaymentCardNewUser: false },
    paymentReducer: { errorSendPaymentCardNewUser: false },
  }),
  subscribe: () => {},
  dispatch: () => {
    // диспачим внутри компонента
    getAddressList: jest.fn()
    getRoutesCoordinates: jest.fn()
    getPaymentCard: jest.fn()
  },
}

it('Renders correctly', () => {
  const FormForMapExample = TestRenderer.create(
    <Provider store={mockStore}>
      <FormForMap />
    </Provider>,
  ).toJSON()

  expect(FormForMapExample).toMatchSnapshot()
})
