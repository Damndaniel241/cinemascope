import React from 'react'
import { Link } from 'react-router-dom'
import {BsFillEyeFill,BsThreeDots} from 'react-icons/bs';
import {SiWindows11} from 'react-icons/si'
import { FaHeart } from 'react-icons/fa';
import Moviebox from './Moviebox';
import slugify from 'react-slugify';



function UserCinemaCard({src,watched,appeared,liked,movie_id,movie_title}) {
  return (
    <>
    <div className='d-flex flex-column align-items-center gap-2'style={{width:"max-content"}} > <Link className="position-relative" to={`/film/${movie_id}/${slugify(movie_title)}`}><img src={src} style={{maxWidth:"100%",height:"auto"}} alt="movie image" className="img-fluid img-10em-13em rounded-2 " />
    <div className="d-flex gap-2 justify-content-center fs-5 text-light " style={{position:'absolute',bottom:'10%',width:"100%"}}>
        <BsFillEyeFill/><FaHeart/><BsThreeDots/>

    </div>
    </Link>

    <div className='d-flex gap-3 justify-content-center flex-wrap '>
        <Link className='no-link-decoration'><span className='light-charcoal'><BsFillEyeFill className='icon-green'/>&nbsp;{watched}</span></Link>
        <Link className='no-link-decoration'><span className='light-charcoal'><SiWindows11 className='icon-blue'/>&nbsp;{appeared}</span></Link>
        <Link className='no-link-decoration'><span className='light-charcoal'><FaHeart className='icon-pink'/>&nbsp;{liked}</span></Link>
    </div>

   
    </div>
    </>
  )
}

export default UserCinemaCard