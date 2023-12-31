import React,{useState,useEffect,useContext} from 'react'
import {Link,useParams,useLocation,useNavigate} from 'react-router-dom'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import axios from 'axios';
import slugify from 'react-slugify';
import '../index.css';
import {FaPlay} from 'react-icons/fa';
import {GoDotFill} from 'react-icons/go';
import Expandable from '../components/Expandable';
import { FilmListTabs,FilmListTab } from '../components/FilmListTab';
import ButtonLink from '../components/ButtonLink';
import FlexTabComponent from '../components/tabcontentcomponents/FlexTabComponent';
import FlexColumnComponent from '../components/tabcontentcomponents/FlexColumnComponent';
import ImportantButtonLink from '../components/ImportantButtonLink';
import SimilarMoviebox from '../components/SimilarMoviebox';
import Moviebox from '../components/Moviebox';
import "../styles/navbarStyles.css"
import {reservelogo,noImage} from '../index';
import ExpandableFlexElement from '../components/ExpandableFlexElement';
import ExpandableFlexColumnElement from '../components/ExpandableFlexColumnElement';
import CallPlayer from '../components/CallPlayer';
import $ from 'jquery';
// import SimilarMoviesPage from './film/SimilarMoviesPage';
import { useDispatch, useSelector } from 'react-redux';
import { setSimilarResults,setMoviePosterPath, setMovieTitle,setMovieYear,setMovieId } from '../actionTypes/actions';
import { isAuthenticated } from '../utils/auth';
import { StarRater } from '../components/StarRater';
import UserCinemaCard from '../components/UserCinemaCard';
import ReviewCard from '../components/ReviewCard';
import { useValue,ValueContext } from '../utils/context/ReviewContext';

import { FaEye,FaHeart } from 'react-icons/fa'
import {BsFillEyeFill,BsFillStopwatchFill} from 'react-icons/bs'
import {useQuill} from 'react-quilljs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
// let API_IMAGE_BIG = "https://image.tmdb.org/t/p/w1280/" ;

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=';





function Moviepage(props) {
  const [value,setValue] = useState();
  const { quill, quillRef } = useQuill();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(()=>{
   
    if (quill) {
        quill.root.dataset.placeholder = 'write something here.....';
        quill.on('text-change', (delta, oldDelta, source) => {
            quill.root.dataset.placeholder = '';
            console.log(quill.root.innerHTML);
      })
    }
},[quill])

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  const content = quill.root.textContent;
  setValue(content);
  // props.handleCallback(content); 

  try {
    
    const response = await axios.post('https://damndaniel241.pythonanywhere.com/create-review/', {
      content: content, // Use the 'value' state to send the review content
      movie_id: id,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the user's token
      },
    });
    console.log(response.data.message); // Success message from Django
    toast.success('🦄 Review Successfully submitted!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  } catch (error) {
    console.error('Error creating review:', error);
  }
}



  const [reviewContent, setReviewContent] = useState('');
  const {id} = useParams();
  const [API_IMAGE_BIG, setAPIImageBig] = useState("https://image.tmdb.org/t/p/w1280/");
  // const [reviewMovieId, setReviewMovieId] = useState(id); 

  function handleReviewContent(content) {
    setReviewContent(content);
  }

      

// console.log(reviewContent);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const movieId = id;
//         const response = await axios.post('http://127.0.0.1:8000/create-review', {
            
//             content: reviewContent,
//             movie_id: movieId,
//         }, {
//             headers: {
//                 'Authorization': `Token ${localStorage.getItem('token')}`, // Include the user's token
//             },
//         });
//         console.log(response.data.message); // Success message from Django
//     } catch (error) {
//         console.error('Error creating review:', error);
//     }
// };




  const isLoggedIn = isAuthenticated();

  function callBack(childData){
  
    return (<>
    <p>{childData}</p>
    </>)
  }

  // const { value } = useContext(ValueContext);


  const jQueryCode = () =>{
    $("#modalId").on('hidden.bs.modal',function(e){
      $("#modalId iframe").attr("src",$("#modalId iframe").attr("src"))
    });
  }



 const location = useLocation();
//  console.log(location.pathname.startsWith('/film/'));
  

  useEffect(() => {
    // Function to update API_IMAGE_BIG based on innerWidth
    const updateImageSize = () => {
      if (window.innerWidth < 768) {
        setAPIImageBig("https://image.tmdb.org/t/p/w500/");

        if(window.innerWidth>517){
          setAPIImageBig("https://image.tmdb.org/t/p/w780/");
        }
      } else {
        setAPIImageBig("https://image.tmdb.org/t/p/w1280/");
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


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Update the screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const [movieData, setMovieData] = useState(null);
  const [movieTrailer,setMovieTrailer] = useState(null);
  const [movieDirector, setMovieDirector] = useState(null);
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  const [AlternateTitles, setAlternateTitles] = useState([]);
  const [studios,setStudios] = useState([]);
  // const [similarResults, setSimilarResults] = useState([]);
  const [youtubeTrailerKey,setYoutubeTrailerKey] = useState(null)

  const similarResults = useSelector((state) => state.similarResults);
  const moviePosterPath = useSelector((state) => state.setMoviePosterPath);
  const movieTitle = useSelector((state)=>state.setMovieTitle);
  const movieYear = useSelector((state)=>state.setMovieYear);
  const movieId = useSelector((state)=>state.setMovieId);
const dispatch = useDispatch();

  // const parts = movieTitle.split('-'); // Split the title at the hyphen
// const baseTitle = parts.slice(0, -1).join('-');
// console.log(baseTitle)


useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
    
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,videos,alternative_titles,similar`)
      
    // console.log(response.data);
    // console.log(response.data.credits.crew);
    // console.log(response.data.videos);
   

    const filter_Director = response.data.credits.crew.filter(member => member.job === "Director")[0].name;
  setMovieDirector(filter_Director)

  const mainTrailer = response.data.videos.results.find(video => video.type === "Trailer" && video.name === "Main Trailer");
  const filteredVideos = mainTrailer
  ? [mainTrailer]
  : response.data.videos.results.filter(video => video.type === "Trailer");

  // console.log(filteredVideos[0].key)
  // console.log(filteredVideos);
  if (filteredVideos.length > 0) {

    const youtubeKey = filteredVideos[0].key;
    const trailerLink = `${YOUTUBE_LINK}${filteredVideos[0].key}`
      setYoutubeTrailerKey(youtubeKey)
      setMovieTrailer(trailerLink) 
      console.log(filteredVideos[0])
  }else {
    // Handle the case where there are no videos
    setMovieTrailer(""); // Or set it to some default value or handle it in your app logic
  }
      setMovieData(response.data);
      setMovieCast(response.data.credits.cast);
      setMovieCrew(response.data.credits.crew);
      // setText(response.data.overview);


      const extractedTitles = response.data.alternative_titles.titles.map(
        (titleData) => titleData.title
      );
      setAlternateTitles(extractedTitles);
    
      const firstFourResults = response.data.similar.results;
      dispatch(setSimilarResults(firstFourResults));
      dispatch(setMoviePosterPath(response.data.poster_path))
      dispatch(setMovieTitle(response.data.title))
      dispatch(setMovieYear(response.data.release_date.slice(0,4)))
      dispatch(setMovieId(response.data.id))
  
      // setSimilarResults(response.data.similar.results.slice(0, 4));

   
      

      // .slice(0, 4);

// console.log(movieCast);
      
    
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  fetchMovieDetails();
}, [id]);



// console.log(AlternateTitles);

if (movieData === null) {
  return 
  (
    <div>
  <p>Loading...</p>
  </div>); // You can show a loading message or spinner here
}

// console.log(firstFourResults);
// console.log(movieTitle,moviePosterPath)

const { backdrop_path, title, overview, poster_path, release_date,
  imdb_id,runtime,tagline,homepage,production_companies,genres,budget,
production_countries,spoken_languages,similar } = movieData;


const groupedCast = {};
movieCrew.forEach((person) => {
  const department = person.department;
  if (!groupedCast[department]) {
    groupedCast[department] = [];
  }
  groupedCast[department].push(person.name);
});




// const bigi = API_IMAGE_BIG+backdrop_path
const intUrl = backdrop_path ? API_IMAGE_BIG+backdrop_path : reservelogo;

const backdrop_inlineStyle = {
  backgroundImage: "linear-gradient(-180deg, rgba(250,247,242,0) 49%, rgba(43,45,65,1) 76%), url(" + intUrl+ ")"
  
}

// console.log(isLoggedIn)

  return (
    <div>
      <Header/>
     
     {!isLoggedIn ? (<>

       <section style={backdrop_inlineStyle} className=' height-100vh height-50vh lg-bg-repeat-round bg-no-repeat bg-pos-center  d-flex flex-column position-relative '>
      
       </section>
      <section id="first-details" className="d-flex justify-content-between align-item-center mx-md-4 mx-2  my-4">
    
      <div className="light-charcoal align-self-center ">
        <h3 className="text-light h1 text-capitalize font-cormorant"><a href={homepage} target='_blank' className='no-link-decoration text-light'>{title}</a></h3>
        <div className="d-flex text-uppercase  "> <Link className="no-link-decoration light-charcoal ">{release_date.slice(0,4)} </Link>&nbsp;<GoDotFill/>&nbsp;Directed by
        </div>
        <h5 className="text-capitalize font-vesper mt-2"><Link className="no-link-decoration light-charcoal ">{movieDirector} </Link></h5>
        <div className="d-flex gap-3 ">
        
      
          {movieTrailer && (<a name="" id="Geeks2" className="btn fs-p-10px  bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href="#" role="button" data-bs-toggle="modal" data-bs-target="#modalId"><FaPlay/> trailer</a>)}
      
          <div className="modal fade " id="modalId" tabIndex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content bg-space-cadet light-charcoal">
      <div className="modal-header bg-space-cadet light-charcoal">
        <h5 className="modal-title" id="modalTitleId">{title} trailer</h5>
        <button type="button" className="btn-close light-charcoal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='iframe-container bg-space-cadet'>
        <iframe
          id="yt-player"
          width="100%" // Use 100% width to fit the modal
          height="0" // Remove the fixed height
          style={{ maxWidth: '100%', maxHeight: '70vh' }} // Limit the height to 70% of the viewport height
          src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="modal-footer bg-space-cadet ">
        {/* <button type="button" className="btn btn-secondary bg-payne-gray light-charcoal" data-bs-dismiss="modal">
          Close
        </button> */}
      </div>
    </div>
  </div>
</div>

        
          
          {/* <!-- Optional: Place to the bottom of scripts --> */}
          <script>
            const myModal = new bootstrap.Modal(document.getElementById('modalId'), options);
           
       
          </script>

        
        

        
          
          {/* {movieTrailer && (<a name="" id="" className="btn fs-p-10px  bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href={movieTrailer} role="button"><FaPlay/> trailer</a>)} */}
        <span className="align-items-center-lg">{runtime} mins</span>
        </div>
        </div>
          
      <img className="w-25 " src={poster_path ? API_IMAGE + poster_path : noImage} alt={title} />
 
        
      </section>

     
     <section className='mb-4 light-charcoal  mx-md-4 mx-2'>
      <p className='text-uppercase'>{tagline}</p>
     <Expandable>{overview}</Expandable>

   
     </section>


     {/* <SimilarMoviesPage similar={similar} /> */}

     <section className='mb-4 ms-md-4 ms-2 light-charcoal'>
     
    <FilmListTabs>
       <FilmListTab label = {"tab0"} tabName={"CAST"}>
  
       
        <ExpandableFlexElement maxChildren={5}>
    {/* {movieCast.map((movieReq)=><ButtonLink to={`/actor/${movieReq.id}${slugify(movieReq.name)}/`}>{movieReq.name} </ButtonLink>)}  */}
    {/* {movieCast.map((movieReq)=><button key={movieReq.id} onClick={() => handleButtonClick(movieReq)}>{movieReq.name} </button>)} */}

    {movieCast.map((movieReq)=> <ButtonLink key={movieReq.id} to={`/actor/${slugify(movieReq.name)}/`} state={{ movieReqId: movieReq.id }}
        >{movieReq.name}</ButtonLink>)}




    </ExpandableFlexElement>
        {/* </FlexTabComponent> */}
       
       </FilmListTab>
       <FilmListTab label = {"tab1"} tabName={"CREW"}>
    
        <ExpandableFlexColumnElement maxChildren={3}>
        


          {Object.keys(groupedCast).map((department, index) => (
            <div key={index}>
            <h6 className='text-uppercase light-charcoal '>{department}</h6>
            <div>
            <ExpandableFlexElement maxChildren={5}>
            {groupedCast[department].map((name, nameIndex) => (
              <ButtonLink to="" key={nameIndex}>{name}</ButtonLink>
              
            ))}
              </ExpandableFlexElement>
          </div>
        </div>
      ))}
        </ExpandableFlexColumnElement>
      
      
      
       </FilmListTab>


       <FilmListTab label = {"tab2"} tabName={"DETAILS"}>
       {production_companies.length > 0 && 
      <FlexColumnComponent>
      <div>
        <h6 className="light-charcoal text-uppercase">studios</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_companies.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {production_countries.length > 0 &&
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">countries</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_countries.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {AlternateTitles.length > 0 && (
        <FlexColumnComponent>
        
          
            <h6 className='text-uppercase light-charcoal '>Alternative titles</h6>
            <div className="light-charcoal d-flex flex-wrap">
            {AlternateTitles.map((title,index)=>(<span key={index}>{title}&nbsp;|&nbsp;</span>))}
         
            </div>  
          
        </FlexColumnComponent>
         )}
       </FilmListTab>


       <FilmListTab label = {"tab3"} tabName={"GENRES"}>
        
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">genres</h6>
        <div>
        <FlexTabComponent>
          {genres.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
        </FlexTabComponent>
        </div>
        </div>
      </FlexColumnComponent>

       </FilmListTab>
    </FilmListTabs>
  
     </section>

<section className='mb-4 light-charcoal  mx-md-4 mx-2'>
  More at &nbsp;

<ImportantButtonLink href={`https://www.imdb.com/title/${imdb_id}/maindetails`}>imdb</ImportantButtonLink> &nbsp;
<ImportantButtonLink href={`https://www.themoviedb.org/movie/${id}-${title}`}>tmdb</ImportantButtonLink>
</section>


    
{similarResults && (
<section id="movies" className='row text-center container-fluid my-4 mx-auto d-flex justify-content-center align-items-center '>
<div className='d-flex  justify-content-between '>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>Similar</Link>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>All</Link>
    </div>
    <hr className=' light-charcoal'/>
    { similarResults.slice(0, 4).map((movie)=> <Moviebox key={movie.id}{...movie}/>)}
    </section>
    )}


     </>   ):( <>

      <section style={backdrop_inlineStyle} className=' height-100vh height-50vh lg-bg-repeat-round bg-no-repeat bg-pos-center  d-flex flex-column position-relative '>
      
      </section>

      {/* design for portrait */}

{screenWidth  < 995 ? ( <div className='d-flex justify-content-center '>

<ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
<FilmListTabs>
<FilmListTab label = {"tab0"} tabName={"WATCH ACTIVITY"} className="">

<div className=" d-flex flex-column justify-content-center align-items-center gap-2 my-5">
      <UserCinemaCard className="" src={poster_path ? API_IMAGE + poster_path : noImage} movie_title={title} watched="1.8M" appeared="239k" liked="821k"/>
    
     {movieTrailer && (<a name="" id="Geeks2" className="btn fs-p-10px  bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href="#" role="button" data-bs-toggle="modal" data-bs-target="#modalId" style={{width:"max-content",alignSelf:"center"}}><FaPlay/> trailer</a>)}

     <div className="modal fade " id="modalId" tabIndex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content bg-space-cadet light-charcoal">
      <div className="modal-header bg-space-cadet light-charcoal">
        <h5 className="modal-title" id="modalTitleId">{title} trailer</h5>
        <button type="button" className="btn-close light-charcoal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='iframe-container bg-space-cadet'>
        <iframe
          id="yt-player"
          width="100%" // Use 100% width to fit the modal
          height="0" // Remove the fixed height
          style={{ maxWidth: '100%', maxHeight: '70vh' }} // Limit the height to 70% of the viewport height
          src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="modal-footer bg-space-cadet ">
        {/* <button type="button" className="btn btn-secondary bg-payne-gray light-charcoal" data-bs-dismiss="modal">
          Close
        </button> */}
      </div>
    </div>
  </div>
</div>
 <script>
            const myModal = new bootstrap.Modal(document.getElementById('modalId'), options);
          
       
          </script>

        

</div>

  </FilmListTab>

  <FilmListTab label = {"tab1"} tabName={"SEE DETAILS"}>
  <div className="col-11 my-5 mx-2">
   <h3 className="text-light h1 text-capitalize font-cormorant"><a href={homepage} target='_blank' className='no-link-decoration text-light'>{title}</a></h3>
   <div className="d-flex text-uppercase  "> <Link className="no-link-decoration light-charcoal ">{release_date.slice(0,4)} </Link>&nbsp;<GoDotFill/>&nbsp;Directed by
        </div>
        <h5 className="text-capitalize font-vesper mt-2"><Link className="no-link-decoration light-charcoal ">{movieDirector} </Link></h5>
   <p className="light-charcoal">{tagline}</p>
   <p className="light-charcoal">{overview}</p>    



     <section className='mb-4 ms-md-4 ms-2 light-charcoal'>
     
    <FilmListTabs>
       <FilmListTab label = {"tab0"} tabName={"CAST"}>
  
       
        <ExpandableFlexElement maxChildren={5}>
    {/* {movieCast.map((movieReq)=><ButtonLink to={`/actor/${movieReq.id}${slugify(movieReq.name)}/`}>{movieReq.name} </ButtonLink>)}  */}
    {/* {movieCast.map((movieReq)=><button key={movieReq.id} onClick={() => handleButtonClick(movieReq)}>{movieReq.name} </button>)} */}

    {movieCast.map((movieReq)=> <ButtonLink key={movieReq.id} to={`/actor/${slugify(movieReq.name)}/`} state={{ movieReqId: movieReq.id }}
        >{movieReq.name}</ButtonLink>)}




    </ExpandableFlexElement>
        {/* </FlexTabComponent> */}
       
       </FilmListTab>
       <FilmListTab label = {"tab1"} tabName={"CREW"}>
    
        <ExpandableFlexColumnElement maxChildren={3}>
        


          {Object.keys(groupedCast).map((department, index) => (
            <div key={index}>
            <h6 className='text-uppercase light-charcoal '>{department}</h6>
            <div>
            <ExpandableFlexElement maxChildren={5}>
            {groupedCast[department].map((name, nameIndex) => (
              <ButtonLink to="" key={nameIndex}>{name}</ButtonLink>
            ))}
              </ExpandableFlexElement>
          </div>
        </div>
      ))}
        </ExpandableFlexColumnElement>
      
      
      
       </FilmListTab>


       <FilmListTab label = {"tab2"} tabName={"DETAILS"}>
       {production_companies.length > 0 && 
      <FlexColumnComponent>
      <div>
        <h6 className="light-charcoal text-uppercase">studios</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_companies.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {production_countries.length > 0 &&
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">countries</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_countries.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {AlternateTitles.length > 0 && (
        <FlexColumnComponent>
        
          
            <h6 className='text-uppercase light-charcoal '>Alternative titles</h6>
            <div className="light-charcoal d-flex flex-wrap">
            {AlternateTitles.map((title,index)=>(<span key={index}>{title}&nbsp;|&nbsp;</span>))}
         
            </div>  
          
        </FlexColumnComponent>
         )}
       </FilmListTab>


       <FilmListTab label = {"tab3"} tabName={"GENRES"}>
        
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">genres</h6>
        <div>
        <FlexTabComponent>
          {genres.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
        </FlexTabComponent>
        </div>
        </div>
      </FlexColumnComponent>

       </FilmListTab>
    </FilmListTabs>
  
     </section>

     <section className='mb-4 light-charcoal  mx-md-4 mx-2'>

 {runtime}mins &nbsp; More at &nbsp;

<ImportantButtonLink href={`https://www.imdb.com/title/${imdb_id}/maindetails`}>imdb</ImportantButtonLink> &nbsp;
<ImportantButtonLink href={`https://www.themoviedb.org/movie/${id}-${title}`}>tmdb</ImportantButtonLink>
</section>

{similarResults && (


<section id="movies" className='row text-center container-fluid my-4 mx-auto d-flex justify-content-center align-items-center '>

<div className='d-flex  justify-content-between '>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>Similar</Link>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>All</Link>
    </div>
    <hr className=' light-charcoal'/>
    { similarResults.slice(0, 4).map((movie)=> <Moviebox key={movie.id}{...movie}/>)}
    </section>)}
    </div>



  </FilmListTab>

  <FilmListTab label = {"tab2"} tabName={"MAKE A REVIEW"}>

  

  <div className=" d-flex flex-column  justify-content-center align-items-center my-5 ">
 
 <ReviewCard setSuccessMessage={setSuccessMessage}  handleCallback={callBack} className=""/>
 {/* {successMessage && (
        <div className="success-message">{successMessage}</div>
      )} */}
 {/* <div className='bg-payne-gray rounded-2   p-3' style={{width:"max-content"}}>
        <div className="d-flex gap-3 justify-content-center  light-gray">
     <div className="d-flex flex-column align-items-center justify-content-center gap-1"><BsFillEyeFill size={50} /> <h6 className='light-charcoal text-capitalize'>Watch</h6>  </div>       
<div className="d-flex flex-column align-items-center justify-content-center gap-1">           <FaHeart size={50}/> <h6 className='light-charcoal text-capitalize'>Like</h6> </div>
            <div className="d-flex flex-column align-items-center justify-content-center gap-1"> <BsFillStopwatchFill size={50}/> <h6 className='light-charcoal text-capitalize'>watchlist</h6> </div>
            
        </div>
        <hr className='space-cadet '/>
        <div>
            <h6 className='text-center'>Rate</h6>
            
            <StarRater className="mx-auto"/>
            <hr className='space-cadet '/>
        </div>
        <h6 className='text-center   ' style={{cursor:"pointer",color:"#3a86ff"}}data-bs-toggle="modal" data-bs-target="#reviewId" >  Review or log…</h6>
        <hr className='space-cadet'/>
    
          
            
          
            <div class="modal fade " id="reviewId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-sm modal-md bg-payne-gray" role="document">
                    <div class="modal-content bg-payne-gray">
                            <div class="modal-header bg-payne-gray">
                                    <h5 class="modal-title light-charcoal" id="reviewTitleId">write a review</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                        <div class="modal-body ">
                
                            <div class="row">
  
      <div className="my-3 bg-payne-gray" style={{  height: "max-content",border: '1px solid lightgray' }}>
      <div ref={quillRef} className=' bg-payne-gray' />
      
      </div>
      </div>
                            </div>
                
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary bg-fire-engine-red" data-bs-dismiss="modal" onClick={handleReviewSubmit}>post review</button>
                          
                        </div>
                    </div>
                </div>
            </div>
            </div> */}
  


</div>

</FilmListTab>


</FilmListTabs>


</div> ):(

      <section className="row gx-2">

<ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
<div className="col-3 d-flex flex-column justify-content-center align-items-center gap-2">
      <UserCinemaCard className="" src={poster_path ? API_IMAGE + poster_path : noImage} movie_title={title} watched="1.8M" appeared="239k" liked="821k"/>
    
     {movieTrailer && (<a name="" id="Geeks2" className="btn fs-p-10px  bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href="#" role="button" data-bs-toggle="modal" data-bs-target="#modalId" style={{width:"max-content",alignSelf:"center"}}><FaPlay/> trailer</a>)}

     <div className="modal fade " id="modalId" tabIndex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content bg-space-cadet light-charcoal">
      <div className="modal-header bg-space-cadet light-charcoal">
        <h5 className="modal-title" id="modalTitleId">{title} trailer</h5>
        <button type="button" className="btn-close light-charcoal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='iframe-container bg-space-cadet'>
        <iframe
          id="yt-player"
          width="100%" // Use 100% width to fit the modal
          height="0" // Remove the fixed height
          style={{ maxWidth: '100%', maxHeight: '70vh' }} // Limit the height to 70% of the viewport height
          src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="modal-footer bg-space-cadet ">
        {/* <button type="button" className="btn btn-secondary bg-payne-gray light-charcoal" data-bs-dismiss="modal">
          Close
        </button> */}
      </div>
    </div>
  </div>
</div>
 <script>
            const myModal = new bootstrap.Modal(document.getElementById('modalId'), options);
          
       
          </script>

        

</div>

    <div className="col-5">
   <h3 className="text-light h1 text-capitalize font-cormorant"><a href={homepage} target='_blank' className='no-link-decoration text-light'>{title}</a></h3>
  <div className="d-flex text-uppercase  align-items-center gap-1 light-charcoal "> <Link className="no-link-decoration light-charcoal ">{release_date.slice(0,4)} </Link>&nbsp;Directed by&nbsp;
         <h5 className="text-capitalize font-vesper mt-2"><Link className="no-link-decoration light-charcoal ">{movieDirector} </Link></h5>
        </div>
   <p className="light-charcoal">{tagline}</p>
   <p className="light-charcoal">{overview}</p>    



     <section className='mb-4 ms-md-4 ms-2 light-charcoal'>
     
    <FilmListTabs>
       <FilmListTab label = {"tab0"} tabName={"CAST"}>
  
       
        <ExpandableFlexElement maxChildren={5}>
    {/* {movieCast.map((movieReq)=><ButtonLink to={`/actor/${movieReq.id}${slugify(movieReq.name)}/`}>{movieReq.name} </ButtonLink>)}  */}
    {/* {movieCast.map((movieReq)=><button key={movieReq.id} onClick={() => handleButtonClick(movieReq)}>{movieReq.name} </button>)} */}

    {movieCast.map((movieReq)=> <ButtonLink key={movieReq.id} to={`/actor/${slugify(movieReq.name)}/`} state={{ movieReqId: movieReq.id }}
        >{movieReq.name}</ButtonLink>)}




    </ExpandableFlexElement>
        {/* </FlexTabComponent> */}
       
       </FilmListTab>
       <FilmListTab label = {"tab1"} tabName={"CREW"}>
    
        <ExpandableFlexColumnElement maxChildren={3}>
        


          {Object.keys(groupedCast).map((department, index) => (
            <div key={index}>
            <h6 className='text-uppercase light-charcoal '>{department}</h6>
            <div>
            <ExpandableFlexElement maxChildren={5}>
            {groupedCast[department].map((name, nameIndex) => (
              <ButtonLink to="" key={nameIndex}>{name}</ButtonLink>
            ))}
              </ExpandableFlexElement>
          </div>
        </div>
      ))}
        </ExpandableFlexColumnElement>
      
      
      
       </FilmListTab>


       <FilmListTab label = {"tab2"} tabName={"DETAILS"}>
       {production_companies.length > 0 && 
      <FlexColumnComponent>
      <div>
        <h6 className="light-charcoal text-uppercase">studios</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_companies.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {production_countries.length > 0 &&
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">countries</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_countries.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>}

      {AlternateTitles.length > 0 && (
        <FlexColumnComponent>
        
          
            <h6 className='text-uppercase light-charcoal '>Alternative titles</h6>
            <div className="light-charcoal d-flex flex-wrap">
            {AlternateTitles.map((title,index)=>(<span key={index}>{title}&nbsp;|&nbsp;</span>))}
         
            </div>  
          
        </FlexColumnComponent>
         )}
       </FilmListTab>


       <FilmListTab label = {"tab3"} tabName={"GENRES"}>
        
      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">genres</h6>
        <div>
        <FlexTabComponent>
          {genres.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
        </FlexTabComponent>
        </div>
        </div>
      </FlexColumnComponent>

       </FilmListTab>
    </FilmListTabs>
  
     </section>

     <section className='mb-4 light-charcoal  mx-md-4 mx-2'>

 {runtime}mins &nbsp; More at &nbsp;

<ImportantButtonLink href={`https://www.imdb.com/title/${imdb_id}/maindetails`}>imdb</ImportantButtonLink> &nbsp;
<ImportantButtonLink href={`https://www.themoviedb.org/movie/${id}-${title}`}>tmdb</ImportantButtonLink>
</section>

{similarResults && (
<section id="movies" className='row text-center container-fluid my-4 mx-auto d-flex justify-content-center align-items-center '>

<div className='d-flex  justify-content-between '>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>Similar</Link>
    <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>All</Link>
    </div>
    <hr className=' light-charcoal'/>
    { similarResults.slice(0, 4).map((movie)=> <Moviebox key={movie.id}{...movie}/>)}
    </section>)}


    </div>




    <div className="col-4 d-flex flex-column  justify-content-center align-items-center ">
<ReviewCard setSuccessMessage={setSuccessMessage} />
{/* {successMessage && (
        <div className="success-message">{successMessage}</div>
      )} */}



     {/* <div className='bg-payne-gray rounded-2   p-3' style={{width:"max-content"}}>
        <div className="d-flex gap-3 justify-content-center  light-gray">
     <div className="d-flex flex-column align-items-center justify-content-center gap-1"><BsFillEyeFill size={50} /> <h6 className='light-charcoal text-capitalize'>Watch</h6>  </div>       
<div className="d-flex flex-column align-items-center justify-content-center gap-1">           <FaHeart size={50}/> <h6 className='light-charcoal text-capitalize'>Like</h6> </div>
            <div className="d-flex flex-column align-items-center justify-content-center gap-1"> <BsFillStopwatchFill size={50}/> <h6 className='light-charcoal text-capitalize'>watchlist</h6> </div>
            
        </div>
        <hr className='space-cadet '/>
        <div>
            <h6 className='text-center'>Rate</h6>
            
            <StarRater className="mx-auto"/>
            <hr className='space-cadet '/>
        </div>
        <h6 className='text-center   ' style={{cursor:"pointer",color:"#3a86ff"}}data-bs-toggle="modal" data-bs-target="#reviewId" >  Review or log…</h6>
        <hr className='space-cadet'/>
      
          
            
           
            <div class="modal fade " id="reviewId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-sm modal-md bg-payne-gray" role="document">
                    <div class="modal-content bg-payne-gray">
                            <div class="modal-header bg-payne-gray">
                                    <h5 class="modal-title light-charcoal" id="reviewTitleId">write a review</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                        <div class="modal-body ">
                        
                            <div class="row">
     

      <div className="my-3 bg-payne-gray" style={{  height: "max-content",border: '1px solid lightgray' }}>
      <div ref={quillRef} className=' bg-payne-gray' />
      
      </div>
      </div>

                            </div>
                    
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary bg-fire-engine-red" data-bs-dismiss="modal" onClick={handleReviewSubmit}>post review</button>
                          
                        </div>
                    </div>
                </div>
            </div>
            </div>  */}

    </div>  


      </section>

      )}
     
  
     {/* <StarRater/> */}
     

     
     </>)}
       <Footer/>
    </div>
  )
}

export default Moviepage