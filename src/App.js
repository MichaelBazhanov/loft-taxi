import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";

import Login from './pages/Login'
import Registration from './pages/Registration'
import Map from './pages/Map'
// import Profile from './pages/Profile'
import Profile from './pages/ProfileFormik'

import Layout from './Layout'

import PrivateRoute from './containers'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='map' element={
            <PrivateRoute>
              <Map />
            </PrivateRoute>
          } />  {/* Доступно только для авторизованных пользователей */}
          <Route path='profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />  {/* Доступно только для авторизованных пользователей */}
        </Route>
      </Routes>
    </>
  )
}

export default App