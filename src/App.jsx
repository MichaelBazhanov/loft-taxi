import React, { useState } from 'react'
import './App.css'
import { connect } from 'react-redux'

import { LoginWithAuth } from './pages/Login'
import { RegistrationWithAuth } from './pages/Registration'
import Map from './pages/Map'
import Profile from './pages/Profile'

import Header from './components/Header'

//Auth
// import { withAuth } from './containers/AuthContext'

const App = () => {
  const [currentPage, setPage] = useState('map') // is Default state

  const navigateTo = page => setPage(page)
  // это функция навигации
  // Дополнительно функция навигации может еше проверять залогинен ли пользователь при любом роуте
  // const navigateTo = page => {
  //   if (isLoggedIn) { // если пользователь авторизован то иди на любую страницу
  //     setPage(page)
  //   } else { // если пользователь не авторизован то иди на страницу LOGIN
  //     page === 'registration' ? setPage('registration') : setPage('login')
  //   }
  // }

  return (
    <div className='App sans antialiased'>
      {(currentPage !== 'login' && currentPage !== 'registration') && <Header navigate={navigateTo} />}
      <main>
        <section className="bg-black-me">
          {currentPage === 'login' && <LoginWithAuth navigate={navigateTo} />}
          {currentPage === 'registration' && <RegistrationWithAuth navigate={navigateTo} />}
          {currentPage === 'map' && <Map />}
          {currentPage === 'profile' && <Profile navigate={navigateTo} />}
        </section>
      </main>
    </div>
  )
}

export default connect(
  state => ({ isLoggedIn: state.auth.isLoggedIn })
)(App)
