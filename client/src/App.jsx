import React, { useState } from 'react'
import './App.css'
import UserRegistration from './components/UserRegistration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserDetails from './components/UserDetails'
import UsersList from './components/UsersList'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserRegistration />} />
          <Route path='/user-details' element={<UserDetails />} />
          <Route path='/users-list' element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
