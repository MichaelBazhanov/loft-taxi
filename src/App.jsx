import React, { useState } from 'react'
import './App.css'

import Login from './pages/Login'
import Registration from './pages/Registration'
import Map from './pages/Map'
import Profile from './pages/Profile'

//Auth
import { withAuth } from './containers/AuthContext'

import Header from './components/Header'

const App = (props) => {
  const [currentPage, setPage] = useState('map') // // is Default state

  //эта функция навигации
  const navigateTo = page => setPage(page)
  // {
  //   if (props.isLoggedIn) { // если пользователь авторизован то иди на любую страницу
  //     setPage(page)
  //   } else { // если пользователь не авторизован то иди на страницу LOGIN
  //     setPage('login')
  //   }
  // }

  return (
    <div className='App sans antialiased'>
      {(currentPage !== 'login' && currentPage !== 'registration') && <Header navigate={navigateTo} />}
      <main>
        <section className="bg-black-me">
          {currentPage === 'login' && <Login navigate={navigateTo} />}
          {currentPage === 'registration' && <Registration navigate={navigateTo} />}
          {currentPage === 'map' && <Map />}
          {currentPage === 'profile' && <Profile navigate={navigateTo} />}
        </section>
      </main>
    </div>
  )
}

export default withAuth(App)
