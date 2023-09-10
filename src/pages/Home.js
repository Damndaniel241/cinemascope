import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import whitelogo from '../whitebackground.png';

import Moviebox from '../components/Moviebox';
import Footer from './Footer';
import Rate from '../components/Rate';
import HomeCarouselSection from '../components/HomeCarouselSection';
import "animate.css";
import {FaAndroid,FaApple} from 'react-icons/fa';





const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
function Home() {
   
   

const [movies,setMovies]  = useState([]);
    useEffect(()=>{
      fetch(API_URL)
      .then((res)=>res.json())
      .then(data=>{
        console.log(data);
        setMovies(data.results);
      })
    },[])

  const [rating,setRating] = useState(0);


  const backgroundImageUrl = 'url('+whitelogo+')' ;
  
  const intUrl = 'url(https://image.tmdb.org/t/p/w1280//35z8hWuzfFUZQaYog8E9LsXW3iI.jpg)';



   
        // const backdropImageUrl = 'https://image.tmdb.org/t/p/w1280'+movie.backdrop_path;
  
    
  const [HomeImageBig, setHomeImageBig] = useState('url(https://image.tmdb.org/t/p/w1280//35z8hWuzfFUZQaYog8E9LsXW3iI.jpg)');
  
             
        useEffect(() => {
          // Function to update API_IMAGE_BIG based on innerWidth
          const updateImageSize = () => {
            if (window.innerWidth < 768) {
              setHomeImageBig("https://image.tmdb.org/t/p/w500//35z8hWuzfFUZQaYog8E9LsXW3iI.jpg)");
      
              if(window.innerWidth>517){
                setHomeImageBig("https://image.tmdb.org/t/p/w780//35z8hWuzfFUZQaYog8E9LsXW3iI.jpg)");
              }
            } else {
              setHomeImageBig("https://image.tmdb.org/t/p/w1280/");
            }
          };
          updateImageSize();
          window.addEventListener('resize', updateImageSize);
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.removeEventListener('resize', updateImageSize);
          };
      
          // Include any other dependencies from your existing useEffect here
        }, []); 
         
        const inlineStyles = {
          backgroundImage: 'linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%),'+HomeImageBig
        
        };
    

  return (
    <div classNameName='home'>
    
        <section id="header" style={inlineStyles} className='gradient-image-overlay d-flex flex-column height-50vh position-relative '>
        <Header/>
           {/* <Link><h6 className='vertical-text position-absolute'>ryan hagel</h6></Link> */}
        {/* <img src={whitelogo} style={{ width: "100%"}} alt="background white"/> */}
        <div className=' gap-4 w-50-md container d-flex justify-content-center  align-items-center flex-column mt-5 text-center'>
    <h1 className=" justify-content-center  align-items-center fs-1 h1-mod text-light  animate__animated animate__bounce animate__delay-2s animate__repeat-2">Track films you’ve watched.Save those you want to see. Tell your friends what’s good.  </h1>
    <Link to="/signup" className="d-block w-50 align-self-center container text-light  btn bg-fire-engine-red">Get started - it's free</Link>
    <p className='text-light'>The social network for film lovers. Also available on <a href="" className=""><FaApple/></a><a href="" className=""> <FaAndroid/> </a>
</p>
    </div>
        
        </section>
     

       



        <section id="movies" className='row text-center container-fluid  mt-5 d-flex justify-content-center align-items-center '>
      <p className='text-start text-light h4 '>What's Popular?</p>
        
      {movies.map((movieReq)=><Moviebox key={movieReq.id} {...movieReq} />)}
    
    
        </section>
   
  
        
        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)}/> */}
        {/* {movies.map((movieReq)=><HomeCarouselSection key={movieReq.id} id={movieReq.id} {...movieReq} />)} */}
         

        <Footer/>
    </div>
  )
}

export default Home;
export {whitelogo};