import React from 'react'
import FlexTabComponent from './FlexTabComponent'
import ButtonLink from '../ButtonLink'

function FlexColumnComponent({heads,children}) {
  return (
    <div className='d-flex my-3 flex-column gap-1'>
        {heads}
        
      {children}
    
        
    </div>
  )
}

export default FlexColumnComponent