import React,{useState,useEffect} from 'react'
import {Link,useParams,useLocation} from 'react-router-dom'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import axios from 'axios';



const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;

function Moviepage() {
  const location = useLocation();
  const movieId = location.state?.movieId;
  console.log(location);

  const {movieTitle} = useParams();
  const [movieData, setMovieData] = useState(null);
  console.log(movieTitle)

  const parts = movieTitle.split('-'); // Split the title at the hyphen
const baseTitle = parts.slice(0, -1).join('-');
console.log(baseTitle)


useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query:baseTitle,
          // Other query parameters if needed
        },
      });

      const movieData = response.data.results;
      console.log(movieData.length)
      // Set the movie data in the component's state or variables
      // For example:
      let firstMovie;
      if (movieData.length > 0) {
        // Assuming you want to fetch the details of the first movie in the list
         firstMovie = movieData[0];
      }else{
       firstMovie = movieData
      }
        console.log(firstMovie);
      setMovieData(firstMovie);
      
      // console.log(movieData)
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  fetchMovieDetails();
}, [baseTitle]);

if (movieData === null) {
  return 
  (
    <div>
  <p>Loading...</p>
  </div>); // You can show a loading message or spinner here
}



const { backdrop_path='', title='', overview='', poster_path='', id='' } = movieData;
  return (
    <div>
      {/* <h1>{movieData.title}</h1>
    <img src={API_IMAGE + movieData.poster_path} alt={movieData.title} />
    <p>Release Date: {movieData.release_date}</p>
    <p>Overview: {movieData.overview}</p>
    Add more details as needed
      <h1>Movie Details for {movieTitle}</h1> */}
       <h1>{title}</h1>
       <img src={API_IMAGE + poster_path} alt={title} />

       <p>Overview: {overview}</p>
       <img src={API_IMAGE + backdrop_path} alt={title} />

       <p className='text-light'>the id for this movie is {movieId}</p>
    </div>
  )
}

export default Moviepage