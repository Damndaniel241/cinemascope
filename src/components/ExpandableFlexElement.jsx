import React, { useState } from 'react';
import FlexTabComponent from './tabcontentcomponents/FlexTabComponent';
import {BiSolidDownArrow} from 'react-icons/bi'
import {FaPlay} from 'react-icons/fa'
import ButtonLink from './ButtonLink';

const ExpandableFlexElement = ({ children, maxChildren = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleChildren = expanded ? children : children.slice(0, maxChildren);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
         <FlexTabComponent>
      {visibleChildren.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
      {children.length <= maxChildren ? null : (
        <button className='light-charcoal align-self-center ' onClick={toggleExpanded}>
          {expanded ?  <BiSolidDownArrow/> : <FaPlay/>}
        </button>
      )}
      </FlexTabComponent>
    </div>
  );
};

export default ExpandableFlexElement;
