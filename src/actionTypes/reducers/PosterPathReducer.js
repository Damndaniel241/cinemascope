import { createReducer } from '@reduxjs/toolkit';
import { setMoviePosterPath } from '../actions';


const initialState = [];


const moviePosterPathReducer = createReducer(initialState, {
    [setMoviePosterPath]: (state, action) => {
      return action.payload; // Set the state to the provided results
    },
  });
  
  export default moviePosterPathReducer;