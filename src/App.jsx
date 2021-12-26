import React, { useState } from 'react'
import './App.css'

import { LoginWithAuth } from './pages/Login'
import { RegistrationWithAuth } from './pages/Registration'
import Map from './pages/Map'
import Profile from './pages/Profile'

import Header from './components/Header'

//Auth
import { withAuth } from './containers/AuthContext'


const App = (props) => {
  const [currentPage, setPage] = useState('map') // is Default state

  // эта функция навигации
  const navigateTo = page => setPage(page)
  // const navigateTo = page => {
  //   if (props.isLoggedIn) { // если пользователь авторизован то иди на любую страницу
  //     setPage(page)
  //   } else { // если пользователь не авторизован то иди на страницу LOGIN
  //     setPage('login')
  //   }
  // }

  return (
    <div className='App sans antialiased'>
      {(currentPage !== 'login' && currentPage !== 'registration') && <Header navigate={navigateTo} {...props}/>}
      <main>
        <section className="bg-black-me">
          {currentPage === 'login' && <LoginWithAuth navigate={navigateTo} {...props} />}
          {currentPage === 'registration' && <RegistrationWithAuth navigate={navigateTo} {...props} />}
          {currentPage === 'map' && <Map />}
          {currentPage === 'profile' && <Profile navigate={navigateTo} />}
        </section>
      </main>
    </div>
  )
}

export default withAuth(App)
