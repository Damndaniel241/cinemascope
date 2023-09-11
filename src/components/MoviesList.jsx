import React from 'react';
import PropTypes from 'prop-types';
import "../styles/MovieListStyles.css"

const Movie = ({ id, title, poster_path }) => (
  <div className="movie">
    <figure>
      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={title} />
      <figcaption>
        <h2 className="movie__title">{title}</h2>
      </figcaption>
    </figure>
  </div>
);

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
};

const MoviesList = ({ movies }) => (
  <ul className="movies">
    {movies.map(movie => (
      <li key={movie.id}>
        <Movie {...movie} />
      </li>
    ))}
  </ul>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default MoviesList;
