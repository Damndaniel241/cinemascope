import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../../pages/Header';
import Footer from '../../pages/Footer';
import {Link} from 'react-router-dom';
import Moviebox from '../../components/Moviebox'
import {BsDistributeVertical} from 'react-icons/bs'
import CinemaCard from '../../components/CinemaCard';

function SimilarMoviesPage(props) {

  const similarResults = useSelector((state) => state.similarResults);
  const moviePosterPath = useSelector((state) => state.moviePosterPath);
  const movieTitle = useSelector((state)=>state.movieTitle);
  const movieYear = useSelector((state)=>state.movieYear);
  
  console.log(movieYear)

  const API_IMAGE = "https://image.tmdb.org/t/p/w500/"; 

  return (
    <>
    <Header/>
    {/* <Moviebox/> */}

    <div className='mx-md-4 mx-2'>
      <section className="light-charcoal my-5 gap-3 d-flex">
        <div className=''>
        <img src={`${API_IMAGE}${moviePosterPath}`} alt="movie image" className="img-fluid img-5em-8em rounded-2 " />
        </div>
        <div className="">
        <h6 className='text-uppercase'>films similar to</h6>
        <h4 className='text-light d-inline'>{movieTitle}</h4>&nbsp;<Link to="" className="no-link-decoration light-charcoal">{movieYear}</Link>
        </div>
      </section>

      <section className='light-charcoal'>
            <hr/>
            <h5 className="text-end"><BsDistributeVertical/></h5>
            <hr/>
        </section>


     <section className="row gx-2 gy-2">
     {similarResults.map((result) => <Moviebox 
     key={result.id}
      
       {...result}
        
    />
   
    )}
     </section>

     <section className="d-flex justify-content-center align-items-center my-5">
      <CinemaCard src={`${API_IMAGE}${moviePosterPath}`} watched="1.8M" appeared="239k" liked="821k"/>
      {/* <img src={`${API_IMAGE}${moviePosterPath}`} alt="movie image" className="img-fluid img-10em-13em rounded-2 " /> */}

      {/* </CinemaCard> */}
     </section>
    </div>
    <Footer/>
    </>
  )
}

export default SimilarMoviesPage