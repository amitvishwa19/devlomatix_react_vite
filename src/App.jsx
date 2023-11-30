import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ClientLayout from './pages/client/ClientLayout';
import Home from './pages/client/Home';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard'
import { messagingToken, onMessageListner } from './service/Firebase'
import Notification from './components/Notification'


function App() {

  useEffect(() => {
    messagingToken()
  }, [])

  const checkAutoLogin = () => {

  }

  onMessageListner()
    .then((payload) => {
      console.log('onMessageListner', payload)
    })



  return (
    <>
      <Routes>

        //Client Routes
        <Route element={<ClientLayout />}>
          <Route path='/' element={<Home />} />
        </Route>


        //Auth Routes
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>


        //Admin Routes
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<Dashboard />} />
        </Route>


      </Routes>
      <Notification />
    </>

  )
}

export default App

