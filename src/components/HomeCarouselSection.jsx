import React from 'react'

const API_IMAGE = "https://image.tmdb.org/t/p/w1280/"; 
function HomeCarouselSection({title,backdrop_path,isActive,inlineStyles}) {

  return (

   <div className={`carousel-item ${isActive ? 'active' : ''}`} style={inlineStyles}>
      <img src={`${API_IMAGE}${backdrop_path}`} className="w-100 d-block" alt={title} />
    </div>
  )
}

export default HomeCarouselSection