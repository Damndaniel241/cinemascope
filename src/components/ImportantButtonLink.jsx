import React from 'react'
import {Link} from 'react-router-dom';
import "../styles/ImportantButtonLinkStyles.css"

function ImportantButtonLink({children,href}) {
  return (

        <a href={href} target='_blank' className='cursor-pointer imp-content no-link-decoration bg-space-cadet light-charcoal imp-border-2'>{children}</a>

  )
}

export default ImportantButtonLink