import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Films from '../src/subpages/Films';
export {Link};


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/films" element={<Films/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
