import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserProfilepage from './UserProfilepage';
import SimilarMoviesPage from './film/SimilarMoviesPage';


function Subpages() {
  return (
    <Routes>
         <Route path="/:username" element={<UserProfilepage />} />
         <Route path="/film/:id/:movieTitle/similar" element={<SimilarMoviesPage/>}/>

    </Routes>
  )
}

export default Subpages