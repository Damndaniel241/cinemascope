import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserProfilepage from './UserProfilepage';

function Subpages() {
  return (
    <Routes>
         <Route path="/:username" element={<UserProfilepage />} />
    </Routes>
  )
}

export default Subpages