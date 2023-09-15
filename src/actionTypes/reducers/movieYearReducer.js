import { createReducer } from '@reduxjs/toolkit';
import { setMovieYear } from '../actions';


const initialState = [];


const movieYearReducer = createReducer(initialState, {
    [setMovieYear]: (state, action) => {
      return action.payload; // Set the state to the provided results
    },
  });
  
  export default movieYearReducer;