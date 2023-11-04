import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserProfilepage from './UserProfilepage';
import SimilarMoviesPage from './film/SimilarMoviesPage';
import UserReviewPage from './UserReviewPage';
import ComingSoon from '../components/ComingSoon';


function Subpages() {
  return (
    <Routes>
         <Route path="/:username" element={<UserProfilepage />} />
         <Route path="/film/:id/:movieTitle/similar" element={<SimilarMoviesPage/>}/>
         <Route path="/:username/film/:id/:moveTitle" element={<UserReviewPage/>}/>
         <Route path="/comingsoon" element={<ComingSoon/>}/>

    </Routes>
  )
}

export default Subpages