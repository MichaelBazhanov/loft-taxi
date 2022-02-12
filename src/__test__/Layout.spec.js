import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Layout from '../Layout/Layout'

// Мокаем useLocation что бы внутри <Layout /> pathname бы равен "/login" и компонент хедер срендерился
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/login',
  }),
}))

// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    tooltipsReducer: {
      isShown: false,
      text: '',
      type: 'success',
    },
  }),
  subscribe: () => {},
  dispatch: () => {
    hideNotification: jest.fn() // диспачим внутри компонента
  },
}

it('Renders correctly', () => {
  const layout = TestRenderer.create(
    <Provider store={mockStore}>
      <Layout />
    </Provider>,
  ).toJSON()

  expect(layout).toMatchSnapshot()
})
