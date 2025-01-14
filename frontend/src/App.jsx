import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/User/UserLogin'
import UserSignup from './pages/User/UserSignup'
import CaptainLogin from './pages/Captain/CaptainLogin'
import CaptainSignup from './pages/Captain/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/User/UserLogout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      } />
      <Route path="/user/logout" element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
      } />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/signup" element={<UserSignup/>} />
      <Route path="/captain/login" element={<CaptainLogin/>} />
      <Route path="/captain/signup" element={<CaptainSignup/>} />
    </Routes>
  )
}

export default App