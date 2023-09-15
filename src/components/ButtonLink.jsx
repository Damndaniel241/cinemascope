import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ButtonLink({to,state,children}) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(to, { state });
  };

  return (
  
        // <span name="" id="" className="btn  bg-payne-gray fs-p-10px h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' role="button"> {children}</span>
        <button className="btn  bg-payne-gray fs-p-10px h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' role="button" onClick={handleButtonClick}>
        {children}
      </button>
  )
}

export default ButtonLink