// store.js
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import similarResultsReducer from '../actionTypes/reducers/SimilarResultsReducer'; // Import your reducer
import moviePosterPathReducer from '../actionTypes/reducers/PosterPathReducer'
import movieTitleReducer from '../actionTypes/reducers/movieTitleReducer';
import movieYearReducer from '../actionTypes/reducers/movieYearReducer';
import movieIdReducer from './reducers/movieIdReducer';
// import UserSlice from './reducers/UserSlice';

const persistConfig = {
  key: 'root',
  storage,
}


// Create the Redux store with Redux Toolkit
const rootReducer = combineReducers({ 
  similarResults: similarResultsReducer,
  movieTitle: movieTitleReducer,
  
  moviePosterPath:moviePosterPathReducer,
  movieYear:movieYearReducer,
  movieId: movieIdReducer,
  // user: UserSlice,
  // auth: authReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});


export const persistor = persistStore(store)

// const store = configureStore({
//   reducer: {
//     similarResults: similarResultsReducer,
//     moviePosterPath:moviePosterPathReducer,
//     movieTitle: movieTitleReducer,
//     movieYear: movieYearReducer,
//     // Add other reducers here if needed
//   },
//   // You can add middleware, dev tools configuration, etc., here if needed
// });

// export default store;































 // store.js
// import { createStore, combineReducers } from 'redux';
// import similarResultsReducer from '../actionTypes/reducers/similarResultsReducer'; // Import your reducer

// // Combine reducers if you have multiple reducers
// const rootReducer = combineReducers({
//   similarResults: similarResultsReducer,
//   // Add other reducers here if needed
// });

// // Create the Redux store
// const store = createStore(rootReducer);

// export default store;
