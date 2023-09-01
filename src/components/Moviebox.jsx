import React from 'react'


const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;

function Moviebox({title,poster_path,vote_average,release_date,overview}) {
  return (
    <div className='col-lg-4 col-12'>
  
        <div className="card mb-4">
          <img className="card-img-top" src={API_IMAGE+poster_path} alt="Title"/>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{overview}</p>
          </div>
        </div>
    
    </div>
  )
}

export default Moviebox