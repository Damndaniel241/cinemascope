// actions.js

import { createAction } from '@reduxjs/toolkit';
// import { SET_SIMILAR_RESULTS } from './actionTypes'; // Import your action type

export const setSimilarResults = createAction('SET_SIMILAR_RESULTS');
export const setMoviePosterPath = createAction('SET_MOVIE_POSTER_PATH');
export const setMovieTitle = createAction('SET_MOVIE_TITLE');
export const setMovieYear = createAction('SET_MOVIE_YEAR')



// export const setSimilarResults = (results) => ({
//   type: SET_SIMILAR_RESULTS,
//   payload: results,
// });
