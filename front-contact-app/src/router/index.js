import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../views/Home'
import TambahContact from '../views/TambahContact'
import EditContact from '../views/EditContact'
function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/add" element={<TambahContact />} />
      <Route path="/edit" element={<EditContact />} />
    </Routes>
  )
}
export default Router
