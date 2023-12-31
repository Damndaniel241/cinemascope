import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { noImage } from '../index';
import slugify from 'react-slugify';


const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;

function Moviebox({title,poster_path,vote_average,release_date,overview,backdrop_path,id, to,state}) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    // Navigate to the film page with moviePageId as state
    navigate(`/film/${slugify(title)}`, { state: { moviePageId: id } });
  };


  const yearPattern = /(\d{4})-\d{2}-\d{2}/;
  const match = release_date.match(yearPattern);
  const year = match ? match[1] : null;


  const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single hyphen

// Create a new title by appending the year and slug
const newTitle = year ? `${slug}-${year}` : slug;


  // Create a new title by appending the year
  // const newTitle = year ? `${title}-${year}` : title;

  return (

    <div className=' col-3 '>
     
        <div className="card ">
        <Link to={{pathname:`/film/${id}/${newTitle}`,
         
          }}>
          <img className="card-img-top" src={poster_path ?API_IMAGE+poster_path:noImage} alt={title}/>
          </Link>

        </div>
       
    </div>
  )
}

export default Moviebox









       {/* <Link   key={id}
          to={{
            pathname: `/film/${slugify(title)}`,
            state: { moviePageId: id },
          }}> */}

          {/* <Link to={`/film/${slugify(title)}`}> */}

{/* <img className="card-img-top" src={poster_path ?API_IMAGE+poster_path:noImage} alt={title} onClick={handleImageClick} /> */}
          {/* </Link> */}
          {/* <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{overview}</p>
          </div> */}