import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import whitelogo from '../whitebackground.png';

import Moviebox from '../components/Moviebox';
import Footer from './Footer';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=2eae85518d6a6151564e13b9cd5af3df"
function Home() {
    const backgroundImageUrl = 'url('+whitelogo+')' ;

    const inlineStyles = {
        backgroundImage: backgroundImageUrl,
        // background: 'linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%)',
        // backgroundBlendMode:'multiply
      };
   

const [movies,setMovies]  = useState([]);
    useEffect(()=>{
      fetch(API_URL)
      .then((res)=>res.json())
      .then(data=>{
        console.log(data);
        setMovies(data.results);
      })
    },[])

  return (
    <div className='home'>
        <section id="header" className='gradient-image-overlay position-relative '>
             <Header/>
             <h6 className='vertical-text position-absolute  '>ryan hagel</h6>
        {/* <img src={whitelogo} style={{ width: "100%"}} alt="background white"/> */}
        <div className=' gap-4 w-50-md container mt-4 text-center'>
    <h1 className=" justify-content-center  align-items-center fs-1-lg fs-4 text-light">Track films you’ve watched.Save those you want to see. Tell your friends what’s good.  </h1>
    <Link to="/signup" className="d-block w-50 align-self-center container  btn btn-primary">Get started - it's free</Link>
    </div>
        </section>

        <section id="movies" className='row text-center container-fluid  mt-5 d-flex justify-content-center align-items-center '>
      
        
      {movies.map((movieReq)=><Moviebox key={movieReq.id} {...movieReq} />)}
    
    
        </section>
   
  
        <Footer/>
    </div>
  )
}

export default Home;
export {whitelogo};