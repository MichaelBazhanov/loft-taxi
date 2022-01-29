import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from '../pages/Login'
// ======================================================================================= Тестирование SNAPSHOTS
// Мокаем useNavigate что бы внутри <Login /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: {
      isLoggedIn: true,
      isLoading: false,
      error: false,
    },
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
// ======================================================================================= Тестирование SNAPSHOTS

// ======================================================================================= Тестирование библиотекой тестирования
describe('Login', () => {
  test('При вводе данных в input на form происходят изменения в state компонента', () => {
    // 1 Найти на форме inputs
    // 2 Вписать туда данные
    // 3 Проверить что эти данные в state появились
    // const MockComponentLogin = () => {
    //   <Provider store={mockStore}>
    //     <Login />
    //   </Provider>
    // }

    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    )
    // render(<Login />)

    const mail = screen.getByPlaceholderText('mail@mail.ru')
    // const password = screen.getByPlaceholderText('*************')

    userEvent.type(mail, 'Текст для mail')
    expect(mail).toHaveValue('Текст для mail')
  })

  // test('При клики на кнопку submit на форме сама форма успешно отправляется', () => {
  //   const MockComponentLogin = () => {
  //     <Login />
  //   }
  // const onChange = jest.fn()
  // expect(onChange).toHaveBeenCalled(2)
  // })
})
// ======================================================================================= Тестирование библиотекой тестирования
