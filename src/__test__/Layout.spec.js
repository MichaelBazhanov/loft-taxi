import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'

import Layout from '../Layout/Layout'

it('Renders correctly', () => {
  const layout = TestRenderer.create(<Layout />).toJSON() // превращаем компонент в JSON

  render(
    <Routes>
      <layout />
    </Routes>,
  )

  expect(layout).toMatchSnapshot()
})

