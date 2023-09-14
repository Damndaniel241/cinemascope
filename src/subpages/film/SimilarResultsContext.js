import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SimilarResultsContext = createContext();

export function useSimilarResults() {
  return useContext(SimilarResultsContext);
}

export function SimilarResultsProvider({ children }) {
  const [similarResults, setSimilarResults] = useState([]);

  const contextValue = {
    similarResults,
    setSimilarResults,
  };

  return (
    <SimilarResultsContext.Provider value={contextValue}>
      {children}
    </SimilarResultsContext.Provider>
  );
}
