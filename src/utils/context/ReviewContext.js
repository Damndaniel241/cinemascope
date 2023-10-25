

import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState(null);

  return (
    <ReviewContext.Provider value={{ reviewData, setReviewData }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewData = () => {
  return useContext(ReviewContext);
};
