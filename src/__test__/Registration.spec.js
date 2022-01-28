import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import Registration from '../pages/Registration'

// Мокаем useNavigate что бы внутри <Registration /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: { token: '' },

    authorizationReducer: { isLoggedIn: false },
    registrationReducer: { isLoading: false },
    registrationReducer: { error: false },
  }),
  subscribe: () => {},
  dispatch: () => {
    // диспачим внутри компонента
    getRegistration: jest.fn()
    sendPaymentCardNewUser: jest.fn()
  },
}

it('Renders correctly', () => {
  const RegistrationExample = TestRenderer.create(
    <Provider store={mockStore}>
      <Registration />
    </Provider>,
  ).toJSON()

  expect(RegistrationExample).toMatchSnapshot()
})
