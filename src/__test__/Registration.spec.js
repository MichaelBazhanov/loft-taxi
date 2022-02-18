import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import Registration from '../pages/Registration'

import { render, screen, waitFor } from '@testing-library/react'
import { logRoles } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

// ======================================================================================= Тестирование SNAPSHOTS
// Мокаем useNavigate что бы внутри <Registration /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))
// Формируем замоканый стор
const mockStore = {
  getState: () => ({
    // входящие пропсы
    authorizationReducer: {
      token: '',
      isLoggedIn: false,
    },

    registrationReducer: {
      isLoading: false,
      error: false,
    },
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
// ======================================================================================= Тестирование SNAPSHOTS

// ======================================================================================= Тестирование библиотекой тестирования
describe('Registration', () => {
  // 1 Найти на форме inputs и проверить ввод туда данных и отображение этих данных
  // 2 Проверить что бы Кнопка отправки формы была с типом submit
  // 3 проверить что бы кнопка submit была недоступна при пустых полях inputs а при заполненных, доступна

  test('При вводе данных в input type="email" на form происходят изменения inputs.value', async () => {
    render(
      <Provider store={mockStore}>
        <Registration />
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
        <Registration />
      </Provider>,
    )

    await waitFor(async () => {
      const inputPassword = screen.getByPlaceholderText('*************')
      await userEvent.clear(inputPassword)
      await userEvent.type(inputPassword, 'password')
      expect(inputPassword).toHaveValue('password')
    })
  })

  test('При вводе данных в input type="text" (name) на form происходят изменения inputs.value', async () => {
    render(
      <Provider store={mockStore}>
        <Registration />
      </Provider>,
    )

    await waitFor(async () => {
      const inputName = screen.getByPlaceholderText('Michael')
      await userEvent.clear(inputName)
      await userEvent.type(inputName, 'Michael')
      expect(inputName).toHaveValue('Michael')
    })
  })

  test('При вводе данных в input type="text" (surname) на form происходят изменения inputs.value', async () => {
    render(
      <Provider store={mockStore}>
        <Registration />
      </Provider>,
    )

    await waitFor(async () => {
      const inputSurname = screen.getByPlaceholderText('Bashanov')
      await userEvent.clear(inputSurname)
      await userEvent.type(inputSurname, 'Bashanov')
      expect(inputSurname).toHaveValue('Bashanov')
    })
  })

  test('Проверка типа кнопки отправки формы type="submit" что она есть', async () => {
    render(
      <Provider store={mockStore}>
        <Registration />
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
        <Registration onSubmit={handleSubmit} />
      </Provider>,
    )

    await waitFor(async () => {
      const inputMail = screen.getByPlaceholderText('mail@mail.ru')
      await userEvent.clear(inputMail)
      await userEvent.type(inputMail, '123@123.ru')

      const inputPassword = screen.getByPlaceholderText('*************')
      await userEvent.clear(inputPassword)
      await userEvent.type(inputPassword, 'password')

      const inputName = screen.getByPlaceholderText('Michael')
      await userEvent.clear(inputName)
      await userEvent.type(inputName, 'Michael')

      const inputSurname = screen.getByPlaceholderText('Bashanov')
      await userEvent.clear(inputSurname)
      await userEvent.type(inputSurname, 'Bashanov')

      await userEvent.click(screen.getByRole('button', { type: /submit/i }))

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})
// ======================================================================================= Тестирование библиотекой тестирования
