import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import whitelogo from '../whitebackground.png';

import Moviebox from '../components/Moviebox';
import Footer from './Footer';
import Rate from '../components/Rate';
import axios from 'axios';
import "animate.css";
import {FaAndroid,FaApple,FaHeart,FaStar} from 'react-icons/fa';
import Signup from './Signup';
import Register from '../components/Register';
import {BsFillEyeFill} from 'react-icons/bs';
import {IoStarSharp,IoMdStar} from 'react-icons/io';
import {TfiLayoutListThumbAlt} from 'react-icons/tfi'
import {SiWindows11} from 'react-icons/si'
import {BsJournalCheck} from 'react-icons/bs'
import SimpleSlider from '../components/SimpleSlider';
import MovieSlider from '../components/MovieSlider';
// import { useAuth } from '../utils/context/AuthContext';
import { useSelector } from 'react-redux';
import { withAuthentication } from '../utils/WithAuthentication';
import { isAuthenticated } from '../utils/auth';
import { StarRater } from '../components/StarRater';
import ReviewCard from '../components/ReviewCard';
import ReviewList from '../components/ReviewList';
import Avatar from 'react-avatar';
import { noImage } from '../index';
import slugify from 'react-slugify';
import { useReviewData } from '../utils/context/ReviewContext';
import Expandable from '../components/Expandable';



const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
const API_URL_TRENDING = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}` 
const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
function Home() {
   
  // const username = useSelector((state) => state.user.username);

  // const username = localStorage.getItem("username");
  const  isLoggedIn  = isAuthenticated();

  const [username, setUsername] = useState(localStorage.getItem("username"));

  // Define a function to update the username state
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };
  

  const { setReviewData } = useReviewData();

const [movies,setMovies]  = useState([]);

const [trendingMovies, setTrendingMovies] = useState([])
    useEffect(()=>{
      fetch(API_URL)
      .then((res)=>res.json())
      .then(data=>{
        console.log(data);
        setMovies(data.results);
      })
    },[])

  const [rating,setRating] = useState(0);


useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
    
          const response = await axios.get(`${API_URL_TRENDING}`)
      
    console.log(response.data.results);
  

    // console.log(response.data.credits.crew);
    // console.log(response.data.videos);
    setTrendingMovies(response.data.results);
   

      
    
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  fetchMovieDetails();
}, []);




const [reviews,setReviews] = useState([])
useEffect(()=>{
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/retrieve-review/')
      // console.log(response.data.reviews);
      const reviewData = response.data.reviews;
      const updatedReviews = await Promise.all(
        reviewData.map(async (review) => {
          const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${review.movie}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,videos,alternative_titles,similar`);
        
        const movieData = movieResponse.data;
        return { ...review, movieData };
      
      }
        ));
      // setReviews(response.data.reviews);
      setReviews(updatedReviews);
        
    }catch (error){
      console.log('Error fetching review details:',error);
    }
  };

fetchReviewDetails();
}, []);


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
    
        <section id="header" style={inlineStyles} className='gradient-image-overlay d-flex flex-column lg-bg-img height-50vh position-relative '>
        <Header  />
           {/* <Link><h6 className='vertical-text position-absolute'>ryan hagel</h6></Link> */}
    
           {/* {username &&  (<div className="d-flex justify-content-center align-items-center text-center"> <h1 className='text-light'> welcome {username}</h1> </div>  )} */}
        
        {/* <StarRater/> */}
      
        </section>

        {/* <ReviewCard/> */}
     

        <div className=' gap-4 w-50-md container d-flex justify-content-center  align-items-center flex-column my-auto text-center'>
    
     
    
    <h1 className=" justify-content-center  align-items-center fs-1 h1-mod text-light  animate__animated animate__bounce animate__delay-2s animate__repeat-2">Track films you’ve watched.Save those you want to see. Tell your friends what’s good.  </h1>




{/* <Register classNames="bg-fire-engine-red  align-self-center  text-light  btn">Get started - it's free </Register> */}


<button className='bg-fire-engine-red  align-self-center  text-light  btn'data-bs-toggle="modal" data-bs-target="#sign-up-home" type="button">
Get started - it's free 
</button>

<div class="modal fade" id="sign-up-home" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered  modal-lg  modal-md modal-xl" role="document">
    <div class="modal-content mx-lg-5 mx-2  bg-payne-gray  my-5 p-4">
      <div class="modal-header px-md-2 px-0">
        <h5 class="modal-title text-uppercase" id="modalTitleIdRegister">join cinemascope</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-md-2 px-0">
    
        <Signup/>
    
      </div>
     
    </div>
  </div>
</div> 


{/* <!-- Optional: Place to the bottom of scripts --> */}
<script>
  const myModal = new bootstrap.Modal(document.getElementById('sign-up-home'), options)

</script>









    <p className='text-light h6'>The social network for film lovers. Also available on <a href="" className="light-charcoal h5"><FaApple className=''/></a>&nbsp;<a href="" className="light-charcoal h5"> <FaAndroid/> </a>
</p>
    </div>



<section className="mx-md-4 mx-2 my-4 ">
<div className="row g-2">
  <p className='light-charcoal text-uppercase'>cinemascope lets you...</p>
  
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-red rounded-2  no-link-decoration gap-3 p-3 light-charcoal  ">
     <span className='h1'><BsFillEyeFill/></span><span className='text-capitalize'>keep track of every film you've ever watched (or just from the day you join)</span>
     </Link></div>
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-orange  rounded-2  no-link-decoration gap-3 p-3 light-charcoal  ">
     <span className='h1'><FaHeart/></span><span className='text-capitalize'>show lots of love ,excitement for your favourite films, lists and reviews with a like</span>
     </Link></div>
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-blue rounded-2  no-link-decoration gap-3 p-3 light-charcoal  ">
     <span className='h1'><TfiLayoutListThumbAlt/></span><span className='text-capitalize'>write and share reviews, and follow friends and other members to read theirs</span>
     </Link></div>
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-red rounded-2  no-link-decoration gap-3 p-3 light-charcoal ">
     <span className='h1'><IoMdStar/></span><span className='text-capitalize'>rate each film on a five-star scale (with halves) to record and share your reaction</span>
     </Link></div>
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-orange rounded-2  no-link-decoration gap-3 p-3 light-charcoal  ">
     <span className='h1'><BsJournalCheck/></span><span className='text-capitalize'>keep a diary of your film watching (and upgrade to <strong className="text-capitalize text-light "> pro</strong> for comprehensive stats) </span>
     </Link></div>
     <div className='col-12 col-lg-4  '>
     <Link className="d-flex bg-payne-gray bg-about-blue rounded-2  no-link-decoration gap-3 p-3 light-charcoal ">
     <span className='h1'><SiWindows11/></span><span className='text-capitalize'>compile and share list of films on any topic and keep a watchlist of films to see</span>
     </Link></div>
 {/* {BsFillEyeFill}  {IoStarSharp}
 {TfiLayoutListThumbAlt}
 {SiWindows11} 
 {BsJournalCheck}  */}
   
  </div>
  
</section>


<section className="mx-md-4 mx-2">
  <p className="text-start text-light h4 text-capitalize "> trending today...</p>
  <SimpleSlider>{trendingMovies.map((movieSlide)=><MovieSlider key={movieSlide.id} {...movieSlide} />)}</SimpleSlider>
</section>

        <section id="movies" className='row g-2 text-center container-fluid mx-auto mb-3   mt-5 d-flex justify-content-center align-items-center '>
    
    
  <p className='text-start text-light h4 '>What's Popular?</p>
        
      {movies.map((movieReq)=><Moviebox key={movieReq.id} {...movieReq} />)}
    
    
        </section>
   
  <section className="mx-md-4 mx-2">
        <div className='d-flex  justify-content-between '>
    <Link to="/" className='no-link-decoration light-charcoal text-uppercase '>popular reviews</Link>
    <Link to="/" className='no-link-decoration light-charcoal text-uppercase '>All</Link>
    </div>
    <hr className=' light-charcoal'/>
 
 <div className='my-4'>
{reviews.map((review)=>(<>
 <div className='d-flex gap-4 my-4' key={review.id}>

<div className=''>
        <img src={review.movieData.poster_path?`${API_IMAGE}`+`${review.movieData.poster_path}`:noImage} alt="movie image" className="img-fluid img-5em-8em rounded-2 " />
        </div>

<div className='d-flex justify-content-evenly flex-column '>
<span className='d-flex gap-2'><h5 className="light-charcoal"><Link to={`${review.user_username}/film/${review.movie}/${slugify(review.movieData.title)}`} className='no-link-decoration text-light font-vesper'  onClick={() => setReviewData(review)}>{review.movieData.title}</Link></h5><h5 className='payne-gray'>{review.movieData.release_date.slice(0,4)}</h5></span>
<Link to={`/${review.user_username}`} className='no-link-decoration light-charcoal '><Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/>{review.user_username}</Link>
<h6 className='light-charcoal'><Expandable maxChar={10}>{review.content}</Expandable></h6>

</div>

    </div>
    
     <hr className='light-charcoal'/> </>)  ) }
                      

 </div>
    </section>

      
       
         
  

  
        <Footer/>
    </div>
  )
}

export default Home;
export {whitelogo};










  {/* {reviews.map((reviewreq)=><ReviewList key={reviewreq.id} {...reviewreq} />)} */}