import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Signup() {

  return (
    <>
    {/* <Header/> */}
    {/* <div className='mx-5 bg-payne-gray rounded-4 my-5 p-4'> */}
    
      {/* <h1 className="text-dark h4 text-uppercase text-white">Join cinemascope</h1> */}
      <form method='post' className='text-start ms-0'>
        <div className="mb-3">
          <label for="email-id" className="form-label text-light text-start ">Email</label>
          <input type="email"
              className="form-control form-control-sm placeholder-signup " name="email" id="email-id" aria-describedby="helpId" placeholder=""/>
        </div>
        <div className="mb-3 w-md-25 ">
          <label for="username-id" className="form-label text-light">Username</label>
          <input type="text"
              className="form-control form-control-sm placeholder-signup" name="username" id="username-id" aria-describedby="helpId" placeholder=""/>
        </div>
        <div className="mb-3 w-md-25 ">
          <label for="password-id" className="form-label text-light">Password</label>
          <input type="password"
              className="form-control form-control-sm placeholder-signup" name="password" id="password-id" aria-describedby="helpId" placeholder=""/>
        </div>

    
        
        <div className="form-check">
          <input className="form-check-input" type="checkbox" placeholder="" value=""/>
          <label className="form-check-label light-charcoal" for="">
            I am at least 16 years old and accept the <Link className=" text-white text-decoration-none " to="">Terms of use</Link>
          .</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value=""  />
          <label className="form-check-label light-charcoal" for="">
            i accept the <Link className=" text-white text-decoration-none  " to="">Privacy Policy </Link>and consent to the processing of my personal information in accordance with it.
             
          </label>
        </div>
      <button type="submit" className=" bg-fire-engine-red rounded-2 mt-3 text-uppercase text-light">sign up</button>
      </form>
    {/* </div> */}

    {/* <Footer/> */}
    </>
  )
}

export default Signup