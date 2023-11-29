import React, {useEffect} from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ClientLayout from './pages/client/ClientLayout';
import Home from './pages/client/Home';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard'
import firebaseService from './service/FirebaseService';



function App() {

  useEffect(() => {
    notificationRequest();

    // const unsubscribe = firebaseService.onMessageListner()
    // .then(payload=>{
    //     console.log(payload)
    // })

    // return ()=>(unsubscribe())
  }, [])
  


  async function notificationRequest() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const unsubscribe = await firebaseService.getMessagingToken()
      .then((currentToken)=>{
        localStorage.setItem('webDeviceToken', currentToken)
      })
      
    } else {
      console.log('Permission denied for notification')
    }
  }

  return (
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

  )
}

export default App

