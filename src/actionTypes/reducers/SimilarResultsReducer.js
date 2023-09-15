// similarResultsReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { setSimilarResults } from '../actions'; // Import your action

// Initial state for similarResults
const initialState = [];

// Create a reducer using createReducer
const similarResultsReducer = createReducer(initialState, {
  [setSimilarResults]: (state, action) => {
    return action.payload; // Set the state to the provided results
  },
});

export default similarResultsReducer;


















// // similarResultsReducer.js
// import { SET_SIMILAR_RESULTS } from '../actionTypes'; // Adjust the path accordingly

// // Initial state for the similarResults
// const initialState = [];

// // Create a reducer
// const similarResultsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SIMILAR_RESULTS:
//       return action.payload; // Set the state to the provided results
//     default:
//       return state;
//   }
// };

// export default similarResultsReducer;
