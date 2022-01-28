import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import Login from '../pages/Login'

// Мокаем useNavigate что бы внутри <Login /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: { isLoggedIn: true },
    authorizationReducer: { isLoading: false },
    authorizationReducer: { error: false },
  }),
  subscribe: () => {},
  dispatch: () => {
    // диспачим внутри компонента
    authenticate: jest.fn()
  },
}

it('Renders correctly', () => {
  const LoginExample = TestRenderer.create(
    <Provider store={mockStore}>
      <Login />
    </Provider>,
  ).toJSON()

  expect(LoginExample).toMatchSnapshot()
})
