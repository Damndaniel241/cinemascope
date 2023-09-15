import { createReducer } from '@reduxjs/toolkit';
import { setMovieTitle } from '../actions';


const initialState = [];


const movieTitleReducer = createReducer(initialState, {
    [setMovieTitle]: (state, action) => {
      return action.payload; // Set the state to the provided results
    },
  });
  
  export default movieTitleReducer;