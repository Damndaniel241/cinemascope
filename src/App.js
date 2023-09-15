import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Films from '../src/subpages/Films';
import Moviepage from './subpages/Moviepage';
import Subpages from './subpages/Subpages';
import SearchResults from './components/SearchResults'; 
import { SimilarResultsProvider } from '../src/subpages/film/SimilarResultsContext';
import SimilarMoviesPage from './subpages/film/SimilarMoviesPage';
import ActorPage from './subpages/ActorPage';



function App() {
  return (
    // <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
     
    
      <Route path="/films" element={<Films/>}/>
      <Route path="/film/:id/:movieTitle" element={<Moviepage/>}/>
      <Route path="/actor/:name" element={<ActorPage/>}/>
      <Route path="/search/:query" element={<SearchResults/>} />
      <Route path="/*" element={<Subpages />}/>

    </Routes>
    
    </BrowserRouter>
    
  
    // </>
  );
}

export default App;
