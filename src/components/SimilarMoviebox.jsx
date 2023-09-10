import React from 'react'
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';

const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
function SimilarMoviebox({release_date,title,poster_path,id}) {
    const yearPattern = /(\d{4})-\d{2}-\d{2}/;
    const match = release_date.match(yearPattern);
    const year = match ? match[1] : null;

    const slug = slugify(title)
    const newTitle = year ? `${slug}-${year}` : slug;


  return (
  <>
    
    
  
    
    <div className='col-lg-3 col-md-6 col-12'>
    <div className="card mb-4">
        <Link to={{pathname:`/film/${id}/${newTitle}`}}>
          <img className="card-img-top" src={API_IMAGE+poster_path} alt="Title"/>
          </Link>
        </div>
        </div>
  
  
      

        </>
  )
}

export default SimilarMoviebox