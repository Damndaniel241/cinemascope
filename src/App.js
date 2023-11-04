import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './pages/Home';
import Login2 from './pages/Login2';
import Signup2 from './pages/Signup2';
import Films from '../src/subpages/Films';
import Moviepage from './subpages/Moviepage';
import Subpages from './subpages/Subpages';
import SearchResults from './components/SearchResults'; 
import { SimilarResultsProvider } from '../src/subpages/film/SimilarResultsContext';
import SimilarMoviesPage from './subpages/film/SimilarMoviesPage';
import ActorPage from './subpages/ActorPage';
import UserProfilepage from './subpages/UserProfilepage';
// import { ValueProvider } from './utils/context/ReviewContext';
import ComingSoon from './components/ComingSoon';



function App() {
  return (
    // <>
      // <ValueProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login2/>}/>
      <Route path="/signup" element={<Signup2/>}/>
     
    
      {/* <Route path="/films" element={<Films/>}/> */}
      <Route path="/film/:id/:movieTitle" element={<Moviepage/>}/>
      <Route path="/actor/:name" element={<ActorPage/>}/>
      <Route path="/search/:query" element={<SearchResults/>} />
      <Route path="/*" element={<Subpages />}/>
      <Route path="/films" element={<ComingSoon />}/>
      <Route path="/members" element={<ComingSoon/>}/>

    </Routes>
    
    </BrowserRouter>
    // </ValueProvider>
  
  
  


  
    //  </>
  );
}

export default App;
