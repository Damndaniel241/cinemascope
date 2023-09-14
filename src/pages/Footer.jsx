import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/footerStyles.css'
import {FaFacebook,FaTwitter,FaPinterest,FaInstagram,FaTiktok,FaQuora,FaHeart,FaGithub} from 'react-icons/fa'; 




function Footer() {
  return (
    <div>
        <footer class="footer d-flex justify-content-center align-items-center bg-payne-gray text-light m-0  ">
    <div class="container d-flex flex-column gap-3 ">
      <ul className="d-flex justify-content-center list-unstyled flex-wrap gap-2">
        
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>about</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>news</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>pro</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>podcast</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>year in review</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>help</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>terms</Link></li>
        <li className="light-charcoal text-uppercase "><Link to="" className='light-charcoal'>contact</Link></li>


      </ul>
      <h6 className='light-charcoal fs-1rem text-capitalize text-center '>&copy; cinemascope. made with <FaHeart/> and courage by <a className="light-charcoal" target="_blank" href="www.twitter.com/damndaniel241">daniel ebere</a> in ogun, nigeria. <Link className='light-charcoal '>film data </Link>from <a className="light-charcoal" href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDB</a>.</h6>
      <ul className="d-flex justify-content-center align-items-center  light-charcoal list-unstyled  gap-3">
        <li className="h4"><a href="https://www.nairaland.com" className="light-charcoal"><FaFacebook/></a></li>
        <li className="h4"><a href="https://www.twitter.com/" className="light-charcoal"><FaTwitter/></a></li>
        <li className="h4"><a href="https://www..com/" className="light-charcoal"><FaPinterest/></a></li>
        <li className="h4"><a href="https://www.instagram.com/eberedaniel241" className="light-charcoal"><FaInstagram/></a></li>
        <li className="h4"><a href="https://www.github.com/damndaniel241" className="light-charcoal"><FaGithub/></a></li>
        <li className="h4"><a href="https://www..com/" className="light-charcoal"><FaTiktok/></a></li>
        <li className="h4"><a href="https://www..com/" className="light-charcoal"><FaQuora/></a></li>
        </ul>
    </div>
  </footer>
    </div>
  )
}

export default Footer 