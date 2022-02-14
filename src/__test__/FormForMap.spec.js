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

    addressReducer: {
      address: [
        { id: 1, root: 'Адрес 1' },
        { id: 2, root: 'Адрес 2' },
      ],
      isLoading: false,
      error: false,
    },
    paymentReducer: {
      cardName: 'test',
      cardNumber: '1',
      expiryDate: '000',
      cvc: '1',
      isLoadingSendPaymentCardNewUser: false,
      errorSendPaymentCardNewUser: false,
    },
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
