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
import Signup from './Signup';
import Register from '../components/Register';




const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
function Home() {
   
   


  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
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
          backgroundImage: 'linear-gradient(-180deg, rgba(250,247,242,0) 57%, rgba(43,45,65,1) 91%),'+HomeImageBig
        
        };
    
        // linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%),linear-gradient(-180deg, rgba(250,247,242,0) 57%, rgba(43,45,65,1) 91%),'+HomeImageBig

  return (
    <div className='home'>
    
        <section id="header" style={inlineStyles} className='gradient-image-overlay d-flex flex-column height-50vh position-relative '>
        <Header/>
           {/* <Link><h6 className='vertical-text position-absolute'>ryan hagel</h6></Link> */}
        {/* <img src={whitelogo} style={{ width: "100%"}} alt="background white"/> */}
    
        
        </section>
     

        <div className=' gap-4 w-50-md container d-flex justify-content-center  align-items-center flex-column my-auto text-center'>
    <h1 className=" justify-content-center  align-items-center fs-1 h1-mod text-light  animate__animated animate__bounce animate__delay-2s animate__repeat-2">Track films you’ve watched.Save those you want to see. Tell your friends what’s good.  </h1>




<Register  classNames="bg-fire-engine-red  align-self-center  text-light  btn">Get started - it's free </Register>












    <p className='text-light h6'>The social network for film lovers. Also available on <a href="" className="light-charcoal h5"><FaApple className=''/></a>&nbsp;<a href="" className="light-charcoal h5"> <FaAndroid/> </a>
</p>
    </div>



        <section id="movies" className='row text-center container-fluid mx-auto   mt-5 d-flex justify-content-center align-items-center '>
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
