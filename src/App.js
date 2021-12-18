import React from 'react'
import './App.css'
// import Header from './components/Header/Header'

// function App() {
//   return (
//     <div className="App sans antialiased">
//       <Header/>
//     </div>
//   );
// }

import Home from './components/Home/Home.jsx'
import Map from './components/Map/Map.jsx'
import Profile from './components/Profile/Profile.jsx'
import Login from './components/Login/Login.jsx'

const PAGES = {
  'home': <Home />,
  'map': <Map />,
  'profile': <Profile />,
  'login': <Login />,
}

class App extends React.Component {
  state = { currentPage: 'login' } //home

  navigateTo = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    return (
      <>
        <header>
          <nav>
            <ul>
              <li>
                <button
                  className="bg-black text-white"
                  onClick={() => {
                    this.navigateTo('home')
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="bg-red-900 text-white"
                  onClick={() => {
                    this.navigateTo('map')
                  }}
                >
                  Map
                </button>
              </li>
              <li>
                <button
                  className="bg-green-900 text-white"
                  onClick={() => {
                    this.navigateTo('profile')
                  }}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="bg-green-900 text-white"
                  onClick={() => {
                    this.navigateTo('login')
                  }}
                >
                  login
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section className='bg-gray-300'>{PAGES[this.state.currentPage]}</section>
        </main>
      </>
    )
  }
}

export default App
