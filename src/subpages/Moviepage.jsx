import React,{useState,useEffect} from 'react'
import {Link,useParams,useLocation} from 'react-router-dom'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import axios from 'axios';
import '../index.css';
import {FaPlay} from 'react-icons/fa';
import {GoDotFill} from 'react-icons/go';
import Expandable from '../components/Expandable';
import { FilmListTabs,FilmListTab } from '../components/FilmListTab';
import ButtonLink from '../components/ButtonLink';
import FlexTabComponent from '../components/tabcontentcomponents/FlexTabComponent';
import FlexColumnComponent from '../components/tabcontentcomponents/FlexColumnComponent';
import ImportantButtonLink from '../components/ImportantButtonLink';




const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
const API_IMAGE_BIG = "https://image.tmdb.org/t/p/w1280/" ;
const API_KEY = '2eae85518d6a6151564e13b9cd5af3df';
const YOUTUBE_LINK = 'https://www.youtube.com/watch?v='



function Moviepage() {

  const {movieTitle,id} = useParams();


  const [movieData, setMovieData] = useState(null);
  const [movieTrailer,setMovieTrailer] = useState(null);
  const [movieDirector, setMovieDirector] = useState(null);
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  console.log(movieTitle)

  const parts = movieTitle.split('-'); // Split the title at the hyphen
const baseTitle = parts.slice(0, -1).join('-');
console.log(baseTitle)


useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
    
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`)
      
    console.log(response.data);
    console.log(response.data.credits.crew);
    console.log(response.data.videos);
   

    const filter_Director = response.data.credits.crew.filter(member => member.job === "Director")[0].name;
  setMovieDirector(filter_Director)

  const mainTrailer = response.data.videos.results.find(video => video.type === "Trailer" && video.name === "Main Trailer");
  const filteredVideos = mainTrailer
  ? [mainTrailer]
  : response.data.videos.results.filter(video => video.type === "Trailer");

  console.log(filteredVideos[0].key)
  // console.log(filteredVideos);
    const trailerLink = `${YOUTUBE_LINK}${filteredVideos[0].key}`
      setMovieTrailer(trailerLink) 
      setMovieData(response.data);
      setMovieCast(response.data.credits.cast);
      setMovieCrew(response.data.credits.crew);
      // setText(response.data.overview);



console.log(movieCast);
      
    
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



const { backdrop_path, title, overview, poster_path, release_date,runtime,tagline,homepage } = movieData;


const groupedCast = {};
movieCrew.forEach((person) => {
  const department = person.department;
  if (!groupedCast[department]) {
    groupedCast[department] = [];
  }
  groupedCast[department].push(person.name);
});



// const screeenWidth = useScreenWidth();
// const backgroundImageUrl = screeenWidth <= 768 ? API_IMAGE+backdrop_path : API_IMAGE_BIG+backdrop_path};
// console.log(overview)
// console.log(overview.length)


const bigi = API_IMAGE_BIG+backdrop_path
const intUrl =API_IMAGE_BIG+backdrop_path
// const intUrl = `url('${API_IMAGE_BIG}${backdrop_path}')`
// const intUrl2 = intUrl.replace(/&quot;/,'"')
// console.log("inturl=,",intUrl)
// console.log(intUrl2);
const backdrop_inlineStyle = {
  backgroundImage: "linear-gradient(-180deg, rgba(250,247,242,0) 57%, rgba(43,45,65,1) 91%), url(" + intUrl+ ")"
  
}

  return (
    <div>
      <Header/>
     
       <section style={backdrop_inlineStyle} className=' height-100vh gradient-image-overlay d-flex flex-column position-relative '>
      
       </section>
      <section id="first-details" className="d-flex justify-content-between align-item-center mx-4 my-4">
    
      <div className="light-charcoal align-self-center ">
        <h3 className="text-light h1 text-capitalize font-cormorant"><a href={homepage} target='_blank' className='no-link-decoration text-light'>{title}</a></h3>
        <div className="d-flex text-uppercase  "> <Link className="no-link-decoration light-charcoal ">{release_date.slice(0,4)} </Link>&nbsp;<GoDotFill/>&nbsp;Directed by
        </div>
        <h5 className="text-capitalize font-vesper mt-2"><Link className="no-link-decoration light-charcoal ">{movieDirector} </Link></h5>
        <div className="d-flex gap-3 "><a name="" id="" className="btn   bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href={movieTrailer} role="button"><FaPlay/> trailer</a>
        <span className="align-self-center">{runtime} mins</span>
        </div>
        </div>
            {/* <p className="text-light">Overview: {overview}</p>
       <p className='text-light'>the id for this movie is {id}</p>
       <p className="text-light">the director is  <FaPlay/> {movieDirector} </p>
       <p className="text-light">the movie link is {movieTrailer}</p>
       <p className="text-light">the release date is {release_date.slice(0,4)}</p>
       <p className="text-light">the runtime is {runtime}</p>
       <p className="text-light">{tagline}</p> */}
      {/* <div className=" rounded-3"> */}
      <img className="w-25" src={API_IMAGE + poster_path} alt={title} />
       
      {/* </div> */}

       {/* <div id="overview-id" className='d-none'>{overview}</div> */}
        
      </section>

     
     <section className='mb-4 light-charcoal  mx-4'>
      <p className='text-uppercase'>{tagline}</p>
     <Expandable>{overview}</Expandable>

   
     </section>

     <section className='mb-4 ms-4 light-charcoal'>
     
    <FilmListTabs>
       <FilmListTab label = {"tab0"} tabName={"CAST"}>
  
        <FlexTabComponent>

     {movieCast.map((movieReq)=><ButtonLink>{movieReq.name} </ButtonLink>)}
        </FlexTabComponent>
       </FilmListTab>
       <FilmListTab label = {"tab1"} tabName={"CREW"}>
    
        <FlexColumnComponent >
        


          {Object.keys(groupedCast).map((department, index) => (
            <div key={index}>
            <h6 className='text-uppercase light-charcoal '>{department}</h6>
            <div>
              <FlexTabComponent>
            {groupedCast[department].map((name, nameIndex) => (
              <ButtonLink to="" key={nameIndex}>{name}</ButtonLink>
            ))}
            </FlexTabComponent>
          </div>
        </div>
      ))}
        </FlexColumnComponent>
      
      
      
       </FilmListTab>
       <FilmListTab label = {"tab2"} tabName={"DETAILS"}>
        <p>Tab 3 content</p>
       </FilmListTab>
       <FilmListTab label = {"tab3"} tabName={"GENRES"}>
        <p>Tab 3 content</p>
       </FilmListTab>
    </FilmListTabs>
  
     </section>

<section className='mb-4 light-charcoal  mx-4'>
  More at &nbsp;
  <ImportantButtonLink to="www.nairaland.com">imdb</ImportantButtonLink> &nbsp;
  <ImportantButtonLink to="www.nairaland.com">tmdb</ImportantButtonLink>
</section>
    
      
     
       <Footer/>
    </div>
  )
}

export default Moviepage