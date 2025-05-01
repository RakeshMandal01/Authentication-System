import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Admin from './Components/Admin'
import Home from './Components/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
