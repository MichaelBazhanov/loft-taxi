import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from "./App";

jest.mock('./components/Home/Home.jsx', () => { Home: () => (<div>Home component</div>) })
jest.mock('./components/Login/Login.jsx', () => { Login: () => <div>Login component</div> })
jest.mock('./components/Map/Map.jsx', () => { Map: () => <div>Map component</div> })
jest.mock('./components/Profile/Profile.jsx', () => { Profile: () => <div>Profile component</div> })

describe('App', () => {
  it('renders correcty', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).toMatch('Home component')
  })

  describe('when clicked on navigation buttons', () => {
    it('open the corresponding page', () => {
      const { getByText, container } = render(<App />)

      fireEvent.click(getByText('Map'))
      expect(container.innerHTML).toMatch('Map component')

      fireEvent.click(getByText('Profile'))
      expect(container.innerHTML).toMatch('Profile component')

      fireEvent.click(getByText('Login'))
      expect(container.innerHTML).toMatch('Login component')
    })
  })
})