import React, { useState } from 'react';
import ReviewCard from '../ReviewCard';
import Moviepage from '../../subpages/Moviepage';

function CommonAncestorComponent() {
  const [value, setValue] = useState('');

  

  const handleSubmit = (reviewText) => {
    // Update the `value` state when the user submits the review
    setValue(reviewText);
  };

  return (
    <>
      <ReviewCard onSubmit={handleSubmit} />
      <Moviepage value={value} />
    </>
  );
}
