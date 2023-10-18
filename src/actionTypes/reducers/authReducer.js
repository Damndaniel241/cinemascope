// reducers/authReducer.js
const initialState = {
    user: null,
    // other user-related data
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGOUT':
        return {
          ...state,
          user:null, // Reset user-related data to initial state
        };
      // Handle other actions here
      default:
        return state;
    }
  };
  
  export default authReducer;
  