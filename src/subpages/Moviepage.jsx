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
import SimilarMoviebox from '../components/SimilarMoviebox';
import Moviebox from '../components/Moviebox';
import "../styles/navbarStyles.css"
import {reservelogo,noImage} from '../index';
import ExpandableFlexElement from '../components/ExpandableFlexElement';
import ExpandableFlexColumnElement from '../components/ExpandableFlexColumnElement';
import CallPlayer from '../components/CallPlayer';




const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
// let API_IMAGE_BIG = "https://image.tmdb.org/t/p/w1280/" ;

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=';





function Moviepage() {


  const {movieTitle,id} = useParams();
  const [API_IMAGE_BIG, setAPIImageBig] = useState("https://image.tmdb.org/t/p/w1280/");

 const location = useLocation();
 console.log(location.pathname.startsWith('/film/'));
  

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


  const [movieData, setMovieData] = useState(null);
  const [movieTrailer,setMovieTrailer] = useState(null);
  const [movieDirector, setMovieDirector] = useState(null);
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  const [AlternateTitles, setAlternateTitles] = useState([]);
  const [studios,setStudios] = useState([]);
  const [similarResults, setSimilarResults] = useState([]);
  const [youtubeTrailerKey,setYoutubeTrailerKey] = useState(null)

  // console.log(movieTitle)

  const parts = movieTitle.split('-'); // Split the title at the hyphen
const baseTitle = parts.slice(0, -1).join('-');
console.log(baseTitle)


useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
    
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,videos,alternative_titles,similar`)
      
    console.log(response.data);
    console.log(response.data.credits.crew);
    console.log(response.data.videos);
   

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
      setSimilarResults(firstFourResults);
      // setSimilarResults(response.data.similar.results.slice(0, 4));

      console.log(firstFourResults);
    
      

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



const { backdrop_path, title, overview, poster_path, release_date,
  imdb_id,runtime,tagline,homepage,production_companies,genres,budget,
production_countries,spoken_languages } = movieData;


const groupedCast = {};
movieCrew.forEach((person) => {
  const department = person.department;
  if (!groupedCast[department]) {
    groupedCast[department] = [];
  }
  groupedCast[department].push(person.name);
});



console.log(similarResults.slice(0, 4));
console.log(youtubeTrailerKey);
console.log(window.innerWidth);
// console.log(tagline)

// const screeenWidth = useScreenWidth();
// const backgroundImageUrl = screeenWidth <= 768 ? API_IMAGE+backdrop_path : API_IMAGE_BIG+backdrop_path};
// console.log(overview)
// console.log(overview.length)


// const bigi = API_IMAGE_BIG+backdrop_path
const intUrl = backdrop_path ? API_IMAGE_BIG+backdrop_path : reservelogo;
// const intUrl = `url('${API_IMAGE_BIG}${backdrop_path}')`
// const intUrl2 = intUrl.replace(/&quot;/,'"')
// console.log("inturl=,",intUrl)
// console.log(intUrl2);
const backdrop_inlineStyle = {
  backgroundImage: "linear-gradient(-180deg, rgba(250,247,242,0) 49%, rgba(43,45,65,1) 76%), url(" + intUrl+ ")"
  
}

  return (
    <div>
      <Header/>
     
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

          {/* <!-- Modal Body --> */}
          {/* <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard --> */}
          {/* <div class="modal fade  " id="modalId" tabindex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm modal-xl modal-lg" role="document">
              <div class="modal-content bg-space-cadet light-charcoal">
                <div class="modal-header position-fixed bg-space-cadet light-charcoal">
                  <h5 class="modal-title  " id="modalTitleId">{title} trailer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className='iframe-container'>
                <iframe id="Geeks3" width="560" height="315" src={`https://www.youtube.com/embed/${youtubeTrailerKey}`} align="middle" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="modal-footer ">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               
                </div>
              </div>
            </div>
          </div>
           */}
          
          {/* <!-- Optional: Place to the bottom of scripts --> */}
          <script>
            const myModal = new bootstrap.Modal(document.getElementById('modalId'), options)
           
           
       
          </script>

          <CallPlayer frameId="yt-player"/>
        
          
          {/* {movieTrailer && (<a name="" id="" className="btn fs-p-10px  bg-payne-gray h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' href={movieTrailer} role="button"><FaPlay/> trailer</a>)} */}
        <span className="align-items-center-lg">{runtime} mins</span>
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
      <img className="w-25 " src={poster_path ? API_IMAGE + poster_path : noImage} alt={title} />
       
      {/* </div> */}

       {/* <div id="overview-id" className='d-none'>{overview}</div> */}
        
      </section>

     
     <section className='mb-4 light-charcoal  mx-md-4 mx-2'>
      <p className='text-uppercase'>{tagline}</p>
     <Expandable>{overview}</Expandable>

   
     </section>

     <section className='mb-4 ms-md-4 ms-2 light-charcoal'>
     
    <FilmListTabs>
       <FilmListTab label = {"tab0"} tabName={"CAST"}>
  
       
        <ExpandableFlexElement maxChildren={5}>
    {movieCast.map((movieReq)=><ButtonLink>{movieReq.name} </ButtonLink>)} 
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
      <FlexColumnComponent>
      <div>
        <h6 className="light-charcoal text-uppercase">studios</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_companies.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>

      <FlexColumnComponent>
        <div>
        <h6 className="light-charcoal text-uppercase">countries</h6>
        <div>
        <ExpandableFlexElement maxChildren={5}>
          {production_countries.map((item)=><ButtonLink>{item.name}</ButtonLink>)}
          </ExpandableFlexElement>
        </div>
        </div>
      </FlexColumnComponent>

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
  <ImportantButtonLink to="www.nairaland.com">imdb</ImportantButtonLink> &nbsp;
  <ImportantButtonLink to="www.nairaland.com">tmdb</ImportantButtonLink>
</section>
    
<section id="movies" className='row text-center container-fluid mx-auto d-flex justify-content-center align-items-center '>

<div className='d-flex  justify-content-between '>
    <Link to="" className='no-link-decoration light-charcoal text-uppercase '>Similar</Link>
    <Link to="" className='no-link-decoration light-charcoal text-uppercase '>All</Link>
    </div>
    <hr className=' light-charcoal'/>
    { similarResults.slice(0, 4).map((movie)=> <Moviebox key={movie.id}{...movie}/>)}
    </section>
     
       <Footer/>
    </div>
  )
}

export default Moviepage