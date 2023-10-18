import React,{useEffect,useState} from 'react'
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import {BsDistributeVertical} from 'react-icons/bs'
import Moviebox from '../components/Moviebox';
import Expandable from '../components/Expandable';
import ImportantButtonLink from '../components/ImportantButtonLink';

const tmdb_url = "https://image.tmdb.org/t/p/w500/"


// Initialize state for actor details

function ActorPage() {

    // const { name } = useParams();
const location = useLocation();
const { movieReqId } = location.state;
const [actorDetails, setActorDetails] = useState([]);
const [castDetails, setCastDetails] = useState([]);
const [crewDetails, setCrewDetails] = useState([]);


useEffect(() => {
    const fetchActorDetails = async () => {
      try {
      
            const response = await axios.get(`https://api.themoviedb.org/3/person/${movieReqId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=movie_credits`)
        setActorDetails(response.data)
        setCastDetails(response.data.movie_credits.cast)
        setCrewDetails(response.data.movie_credits.crew)

        } catch (error) {
            console.error('Error fetching movie details:', error);
          }
        };
      
      
        fetchActorDetails();
      }, [movieReqId]);


      const {name,imdb_id,profile_path,birthday,biography} = actorDetails


  return (
    <>
    <Header/>
    <div className='mx-md-4 mx-2'>
        <section className='mt-5 mb-2'>
            <h6 className="light-charcoal text-uppercase ">films starring</h6>
            <h4 className="text-capitalize text-light">{name}</h4>
        </section>

        <section className='light-charcoal'>
            <hr/>
            <h5 className="text-end"><BsDistributeVertical/></h5>
            <hr/>
        </section>

        <section className="row gx-2 gy-2">
        {castDetails.map((movieReq)=><Moviebox key={movieReq.id} {...movieReq} />)}
        </section>
        
        <section className='my-5 '>
            <img className='img-fluid w-100'src={`${tmdb_url}${profile_path}`} alt={`${name} profile image`}/>
            <Expandable>{biography ? biography: ""}</Expandable>
        </section>
        <p className='light-charcoal'>more details at <ImportantButtonLink href={`https://www.themoviedb.org/person/${movieReqId}`}>TMDB</ImportantButtonLink> 
       &nbsp; <ImportantButtonLink href={`https://www.imdb.com/name/${imdb_id}/`}>IMDB</ImportantButtonLink>
        </p>
    </div>
    <Footer/>
    </>
  )
}

export default ActorPage