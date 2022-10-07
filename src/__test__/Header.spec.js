import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import Header from '../components/Header'

// Мокаем NavLink что бы внутри <Header /> отдал просто функцию
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: () => <div>NavLink component</div>,
}))

// Формируем замоканный store
const mockStore = {
  getState: () => {},
  subscribe: () => {},
  dispatch: () => {
    // диспачим внутри компонента
    logOut: jest.fn()
  },
}

it('Renders correctly', () => {
  const HeaderExample = TestRenderer.create(
    <Provider store={mockStore}>
      <Header />
    </Provider>,
  ).toJSON()

  expect(HeaderExample).toMatchSnapshot()
})
