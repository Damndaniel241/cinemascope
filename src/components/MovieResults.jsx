import React from 'react';


const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
function MovieResults({ results }) {
  return (

//     <div >
//       {results.map((movie) => (
//          <div className='col-3'>
//         <div className='card' key={movie.id}>

// <img className="card-img-top" src={API_IMAGE+movie.poster_path} alt="Title"/>
// <div class="card-body">
        
//           <h4 className='card-title'>{movie.title}</h4>
    
//         </div>
//      </div>
//      </div>
//      ))}
//     </div>
    

<div className="row">
{results.map((movie) => (
  <div className="col-md-3" key={movie.id}>
    <div className="card">
      <img className="card-img-top" src={API_IMAGE + movie.poster_path} alt={movie.title} />
      <div className="card-body">
        <h4 className="card-title">{movie.title}</h4>
      </div>
    </div>
  </div>
))}
</div>



  );
}




export default MovieResults;