import React, { useState } from 'react'
import './App.css'

import Login from './pages/Login'
import Registration from './pages/Registration'
import Map from './pages/Map'
import Profile from './pages/Profile'

import Header from './components/Header'

const App = () => {
  const [currentPage, setPage] = useState('login') // // is Default state

  const navigateTo = page => setPage(page)

  return (
    <div className='App sans antialiased'>
      <Header navigate={navigateTo} />
      <main>
        <section className="bg-black-me">
          {currentPage === 'login' && <Login navigate={navigateTo} />}
          {currentPage === 'registration' && <Registration navigate={navigateTo} />}
          {currentPage === 'map' && <Map />}
          {currentPage === 'profile' && <Profile />}
        </section>
      </main>
    </div>
  )
}

export default App
