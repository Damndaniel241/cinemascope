import React,{useState,useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios';
import { useNavigate,Link, Navigate } from 'react-router-dom';

function Signup2() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',

});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', formData);
      // Handle successful registration (e.g., show a success message, redirect to login)
      alert(`Welcome ${formData.username}`)
      console.log('Registration successful:', response.data);
      navigate("/login")
  } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (e.g., display error message)
  }
};


  return (
    <>
    <Header/>
    <div className='d-flex justify-content-center align-items-center my-5 mx-md-4 mx-2 '>
        <div className="bg-payne-gray p-4 rounded-2 container-md">
            <h4 className="text-uppercase text-light">join cinemascope</h4>
    <form  className='text-start ms-0' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="email-id" className="form-label text-light text-start ">Email</label>
          <input type="email"
              className="form-control form-control-sm placeholder-signup " value={formData.email}  onChange={handleChange} name="email" id="email-id" aria-describedby="helpId" placeholder=""/>
        </div>
        <div className="mb-3 w-md-25 ">
          <label for="username-id" className="form-label text-light">Username</label>
          <input type="text"
              className="form-control form-control-sm placeholder-signup" value={formData.username}  onChange={handleChange} name="username" id="username-id" aria-describedby="helpId" placeholder=""/>
        </div>
        <div className="mb-3 w-md-25 ">
          <label for="password-id" className="form-label text-light">Password</label>
          <input type="password"
              className="form-control form-control-sm placeholder-signup" value={formData.password}  onChange={handleChange} name="password" id="password-id" aria-describedby="helpId" placeholder=""/>
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
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Signup2