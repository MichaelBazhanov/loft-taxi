import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import Profile from '../pages/Profile'

// Мокаем useNavigate что бы внутри <Login /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: { token: '' },

    paymentReducer: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      isLoadingGetPaymentCard: false,
      errorGetPaymentCard: false,
      isLoadingSendPaymentCard: false,
      errorSendPaymentCard: false,
      isLoadingSendPaymentCardNewUser: false,
      errorSendPaymentCardNewUser: false,
    },
  }),
  subscribe: () => {},
  dispatch: () => { // диспачим внутри компонента
    logOut: jest.fn()
    sendPaymentCard: jest.fn()
    getPaymentCard: jest.fn()
  },
}

it('Renders correctly', () => {
  const ProfileExample = TestRenderer.create(
    <Provider store={mockStore}>
      <Profile />
    </Provider>,
  ).toJSON()

  expect(ProfileExample).toMatchSnapshot()
})
