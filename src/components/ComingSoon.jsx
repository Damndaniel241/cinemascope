import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

function ComingSoon() {
  return (
    <>
    <Header/>
    <div style={{height:"100vh"}} className="d-flex flex-column justify-content-center align-items-center">
    <div style={{fontSize:"4rem"}}className='coming-soon text-center' >Coming Soon</div>
    {/* <marquee><div style={{fontSize:"4rem"}}className='coming-soon' >Coming Soon</div></marquee>
    <marquee><div style={{fontSize:"6rem"}}className='coming-soon' >Coming Soon</div></marquee>
    <marquee><div style={{fontSize:"8rem"}}className='coming-soon' >Coming Soon</div></marquee> */}
    </div>
    
    <Footer/>
    
    </>
   
  )
}

export default ComingSoon