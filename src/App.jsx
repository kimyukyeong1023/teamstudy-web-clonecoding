import React from 'react'
import HomePage from './pages/HomePage'
import CarDetail from './pages/CarDetail'

import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/cars/:id" element={<CarDetail/>}/>
      </Routes>
    </div>
  )
}
