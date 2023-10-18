import { createReducer } from "@reduxjs/toolkit";
import { setMovieId } from "../actions";


const initialState = [];


const movieIdReducer = createReducer(initialState, {
    [setMovieId]: (state, action) => {
      return action.payload; // Set the state to the provided results
    },
  });
  
  export default movieIdReducer;