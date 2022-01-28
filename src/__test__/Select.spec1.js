import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import Select from '../components/Select'

// import { Listbox, Transition } from '@headlessui/react'
// Мокаем useLocation что бы внутри <Layout /> pathname бы равен "/login" и компонент хедер срендерился
// jest.mock('@headlessui/react', () => () => ({
//   ...jest.requireActual('@headlessui/react'),
//   Listbox: jest.fn(() => true),
//   // Listbox: () => {
//   //   Button: jest.fn()
//   //   Options: jest.fn()
//   // },
//   Transition: () => {},
// }))
jest.mock('@headlessui/react')

// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    addressList: [],
    placeholder: '',
    onChange: () => jest.fn(() => true),
  }),
  subscribe: () => {},
  dispatch: () => {},
}

it('Renders correctly', () => {
  const SelectExample = TestRenderer.create(
    <Provider store={mockStore}>
      <Select />
    </Provider>,
  ).toJSON()

  expect(SelectExample).toMatchSnapshot()
})
