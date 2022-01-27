import React from 'react'
import TestRenderer from 'react-test-renderer'

import Layout from '../Layout/Layout'

// Мокаем useLocation что бы внутри <Layout /> pathname бы равен "/login" и компонент хедер срендерился
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/login"
  })
}));

it('Renders correctly', () => {
  const layout = TestRenderer.create(<Layout />).toJSON();

  expect(layout).toMatchSnapshot()
})