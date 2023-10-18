import React,{useState,useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Login2() {


  const navigate = useNavigate();


  const [currentUser , setCurrentUser] = useState(false);
  const [formData, setFormData] = useState({
    username_or_email: '',
    password: '',
});

const [error, setError] = useState(null); // Add error state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};


 



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/login/', formData);
        const { token,username } = response.data;
        // Store the token in localStorage or a state management library like Redux
        console.log('Token:', token);
        // setCurrentUser(true);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate("/");
        // <Navigate path='/films'/>
        
        // handleLoginSuccess(token);
        // Redirect or update UI as needed upon successful login
       
    } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid username,email or password');
        // Handle login failure, display error message, etc.

        setTimeout(() => {
          setError(null);
        }, 10000); // 10000 milliseconds = 10 seconds
    }
};


  return (
    <>
    <Header/>
    <div className='d-flex justify-content-center  align-items-center  '>
        <div className="mx-md-4 mx-2 container-md bg-payne-gray p-4 my-5 rounded-2  ">
        <h4 className="text-uppercase text-light">sign in</h4>
         <form action="" className='text-start ms-0' method="" onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="" class="form-label">Username or Email</label>
              <input type="text"
                  class="form-control form-control-sm" name="username_or_email" id="" value={formData.username_or_email} aria-describedby="helpId" placeholder=""   onChange={handleChange}/>
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Password</label>
              <input type="password"
                  class="form-control form-control-sm placeholder-signup" name="password" id="" aria-describedby="helpId" value={formData.password} placeholder="" onChange={handleChange} />
            </div>
          {error && (<div className="text-danger">{error}</div>)} 
            <button type="submit" class="btn bg-fire-engine-red mt-3 text-uppercase text-light">Login</button>
            
          </form>
          </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login2