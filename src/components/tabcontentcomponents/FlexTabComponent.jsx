import React from 'react'

function FlexTabComponent({children}) {
  return (
    <div className='d-flex flex-wrap gap-2 mt-2'>{children}</div>
  )
}

export default FlexTabComponent