import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Home from './pages/home'
import ProfilePage from './pages/profile'
import Crud from './pages/sampleCrudUseState'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<LoginPage/>}/>
           <Route path='/register' element={<RegisterPage/>}/>
           <Route path='/home' element={<Home/>}/>
           <Route path='/profile' element={<ProfilePage/>}/>
           <Route path='/crud' element={<Crud/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
