// // context/AuthContext.js
// import React, { createContext, useContext } from 'react';
// import { isAuthenticated } from '../auth';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const isLoggedIn = isAuthenticated();
//   return (
//     <div>
//     <AuthContext.Provider value={{ isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//     </div>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
