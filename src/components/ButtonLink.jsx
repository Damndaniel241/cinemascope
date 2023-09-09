import React from 'react'
import {Link} from 'react-router-dom';
function ButtonLink({to,children}) {
  return (
    <div>
        <Link to={to} name="" id="" className="btn  bg-payne-gray fs-p-10px h6 no-link-decoration light-charcoal  text-uppercase " target='_blank' role="button"> {children}</Link>
    </div>
  )
}

export default ButtonLink