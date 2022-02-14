import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import { render, screen, waitFor } from '@testing-library/react'
import { logRoles } from '@testing-library/dom'
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
  // 1 Найти на форме inputs и проверить ввод туда данных и отображение этих данных
  // 2 Проверить что бы Кнопка отправки формы была с типом submit
  // 3 проверить что бы кнопка submit была недоступна при пустых полях inputs а при заполненных, доступна

  test('При вводе данных в input type="email" на form происходят изменения inputs.value', async () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    )

    await waitFor(async () => {
      const inputMail = screen.getByPlaceholderText('mail@mail.ru')
      await userEvent.clear(inputMail)
      await userEvent.type(inputMail, '123@123.ru')
      expect(inputMail).toHaveValue('123@123.ru')
    })
  })

  test('При вводе данных в input type="password" на form происходят изменения inputs.value', async () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    )

    await waitFor(async () => {
      const inputPassword = screen.getByPlaceholderText('*************')
      await userEvent.clear(inputPassword)
      await userEvent.type(inputPassword, 'password')
      expect(inputPassword).toHaveValue('password')
    })
  })

  test('Проверка типа кнопки отправки формы type="submit" что она есть', async () => {
    render(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    )

    await waitFor(() => {
      const inputButtonSubmit = screen.getByRole('button', { type: /submit/i }) // ПРЕДПОЧТИТЕЛЬНО
      expect(inputButtonSubmit).toHaveAttribute('type', 'submit')
    })
  })

  test('При клики на кнопку submit на форме сама форма успешно отправляется c нужными данными', async () => {
    const handleSubmit = jest.fn()
    render(
      <Provider store={mockStore}>
        <Login onSubmit={handleSubmit} />
      </Provider>
    )

    // const email = screen.getByPlaceholderText('mail@mail.ru')
    // const password = screen.getByPlaceholderText('*************')

    // userEvent.clear(screen.getByPlaceholderText('mail@mail.ru'))
    // userEvent.clear(screen.getByPlaceholderText('*************'))

    // userEvent.type(screen.getByPlaceholderText('mail@mail.ru'), 'mail@mail.ru')
    // userEvent.type(screen.getByPlaceholderText('*************'), 'password')


    // await userEvent.click(screen.getByRole('button', { type: /submit/i }))

    await waitFor( async () => {
      const inputMail = screen.getByPlaceholderText('mail@mail.ru')
      await userEvent.clear(inputMail)
      await userEvent.type(inputMail, '123@123.ru')

      const inputPassword = screen.getByPlaceholderText('*************')
      await userEvent.clear(inputPassword)
      await userEvent.type(inputPassword, 'password')

      await userEvent.click(screen.getByRole('button', { type: /submit/i }))

      expect(handleSubmit).toHaveBeenCalled()
      // expect(handleSubmit).toHaveBeenCalledWith({
      //   email: '123@123.ru',
      //   password: 'password',
      // })
    })

  })
})
// ======================================================================================= Тестирование библиотекой тестирования
