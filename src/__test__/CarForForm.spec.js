import React from 'react'
import TestRenderer from 'react-test-renderer'

import CarForForm from '../components/CarForForm'

it('Renders correctly', () => {
  const CarForFormExample = TestRenderer.create(<CarForForm />).toJSON();

  expect(CarForFormExample).toMatchSnapshot()
})