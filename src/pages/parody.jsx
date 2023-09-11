






        // {movies.map((movie, index) => (
        //   <HomeCarouselSection
        //     key={movie.id}
        //     {...movie}
        //     isActive={index === 0} // Set the first item as active
        //   />
        // ))}






      //   <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
      //   <div className="carousel-inner" role="listbox">
      
      
          
      //   </div>
      //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
      //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      //     <span className="visually-hidden">Previous</span>
      //   </button>
      //   <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
      //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
      //     <span className="visually-hidden">Next</span>
      //     </button>
      // </div>



      import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import whitelogo from '../whitebackground.png';

import Moviebox from '../components/Moviebox';
import Footer from './Footer';
import Rate from '../components/Rate';
import HomeCarouselSection from '../components/HomeCarouselSection';

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
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const sampleImg = movies[3];


  const backgroundImageUrl = 'url('+whitelogo+')' ;
  
  const intUrl = 'url(https://image.tmdb.org/t/p/w1280//35z8hWuzfFUZQaYog8E9LsXW3iI.jpg)';

  // const inlineStyles = {
  //     backgroundImage: 'linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%),'+intUrl
    
  //   };

  const handleCarouselSlide = (index) => {
    setActiveMovieIndex(index);
  };

    const generateCarouselItems = () => {
      return movies.map((movie, index) => {
        const backdropImageUrl = 'https://image.tmdb.org/t/p/w1280'+movie.backdrop_path;
  
        // Define your linear gradient and backdrop image styles
        const inlineStyles = {
          backgroundImage: 'linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%), url('+backdropImageUrl+')',
          // display: activeMovieIndex === index ? 'block' : 'none',
        };
        return (
          <HomeCarouselSection
            key={movie.id}
            className={`gradient-image-overlay d-flex flex-column position-relative ${index === 0 ? 'active' : ''}`}
            style={inlineStyles}
          />
             
         
            {/* Content for each carousel item */}
    
        );
      });
    };


    

  return (
    <div className='home'>
      <Header/>
        {/* <section id="header" style={inlineStyles} classNameName='gradient-image-overlay d-flex flex-column  position-relative '>
        </section> */}
        
         <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" role="listbox">
            {generateCarouselItems()}
          
              
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
              </button>
          </div>

          <div className=' gap-4 w-50-md container d-flex justify-content-center  align-items-center flex-column mt-4 text-center'>
    <h1 className=" justify-content-center  align-items-center fs-1-lg h1-mod text-light">Track films you’ve watched.Save those you want to see. Tell your friends what’s good.  </h1>
    <Link to="/signup" className="d-block w-50 align-self-center container  btn btn-primary">Get started - it's free</Link>
    </div>



        <section id="movies" className='row text-center container-fluid  mt-5 d-flex justify-content-center align-items-center '>
      
        
      {movies.map((movieReq)=><Moviebox key={movieReq.id} {...movieReq} />)}
    
    
        </section>
   
  
        
        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)}/> */}
        {movies.map((movieReq)=><HomeCarouselSection key={movieReq.id} {...movieReq} />)}
         

        <Footer/>
    </div>
  )
}

export default Home;
export {whitelogo};


 {/* <Link><h6 classNameName='vertical-text position-absolute'>ryan hagel</h6></Link> */}
        {/* <img src={whitelogo} style={{ width: "100%"}} alt="background white"/> */}


        // {movies.map((movie, index) => (
        //   <HomeCarouselSection
        //     key={movie.id}
        //     {...movie}
        //     isActive={index === 0} // Set the first item as active
        //   />
        // ))}