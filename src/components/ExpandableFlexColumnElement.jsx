import React, { useState } from 'react';
import FlexTabComponent from './tabcontentcomponents/FlexTabComponent';
import FlexColumnComponent from './tabcontentcomponents/FlexColumnComponent';
import ButtonLink from './ButtonLink';




const ExpandableFlexColumnElement = ({ children, maxChildren = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleChildren = expanded ? children : children.slice(0, maxChildren);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
         <FlexColumnComponent>
      {visibleChildren.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
      {children.length <= maxChildren ? null : (
        <button className="light-charcoal"onClick={toggleExpanded}>
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      </FlexColumnComponent>
    </div>
  );
};

export default ExpandableFlexColumnElement;
