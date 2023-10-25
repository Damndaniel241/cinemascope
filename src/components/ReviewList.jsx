import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';


const API_IMAGE = "https://image.tmdb.org/t/p/w500/"; 


function ReviewList({id,content,movie,user_username,title,release_date,poster_path,}) {

    const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);
  const [username, setUsername] = useState(null);
  const [reviewContent, setReviewContent] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [moviePosterPath, setMoviePosterPath] = useState(null);


  const yearPattern = /(\d{4})-\d{2}-\d{2}/;
  const match = release_date.match(yearPattern);
  const year = match ? match[1] : null;

  

useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
      
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,videos,alternative_titles,similar`)
            setMovieData(response.data)
            setMoviePosterPath(response.data.poster_path)
            setMovieTitle(response.data)
        } catch (error) {
            console.error('Error fetching movie details:', error);
          }
        };
      
      
        fetchMovieDetails();
      }, [movie]);
              

    //   const {poster_path,release_date,title} = movieData;



      const [reviews,setReviews] = useState([])
      useEffect(()=>{
        const fetchReviewDetails = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/retrieve-review/')
            console.log(response.data.reviews);
            setReviewData(response.data.reviews);
          }catch (error){
            console.log('Error fetching review details:',error);
          }
        };
      
      fetchReviewDetails();
      }, []);

    //   const {content,user_username,id} = reviewData;
      


  return (
    // <>
    // {reviews.map((item)=>

    
    <div className='d-flex gap-4'>

<div className=''>
        <img src={`${API_IMAGE}${moviePosterPath}`} alt="movie image" className="img-fluid img-5em-8em rounded-2 " />
        </div>
<div className='d-flex align-items-evenly flex-column '>
<h5 className="light-charcoal">{movieTitle}</h5>
<Link to={`/${user_username}`} className='no-link-decoration light-charcoal '><Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/>{user_username}</Link>
<h5>{content}</h5>
</div>
    </div>

// )}

//     </>


  )
}

export default ReviewList