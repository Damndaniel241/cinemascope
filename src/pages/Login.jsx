import React,{useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import $ from 'jquery';
import { useNavigate,Navigate,useHistory } from 'react-router-dom'

function Login({ modalRef }) {

  const navigate = useNavigate();
  // const history= useHistory();

  const [formData, setFormData] = useState({
    username_or_email: '',
    password: '',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleLoginSuccess = (token) => {
  // Store the token in localStorage
  localStorage.setItem('token', token);
  // $(modalRef.current).modal('hide');
  // You can also store other user-related data if needed
  // localStorage.setItem('user', JSON.stringify(userData));

  // Redirect or update UI as needed upon successful login
  // Example: Redirect to a dashboard page
  // history.push('/dashboard');

 
};


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://damndaniel241.pythonanywhere.com/login/', formData);
        const { token } = response.data;
        // Store the token in localStorage or a state management library like Redux
        console.log('Token:', token);

      
        navigate("/films");
        // <Navigate path='/films'/>
        
        // handleLoginSuccess(token);
        // Redirect or update UI as needed upon successful login
       
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure, display error message, etc.
    }
};
  return (
    <>
        {/* <Header/> */}
        {/* <div className="mx-5 bg-payne-gray rounded-4 my-5 p-4"> */}
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

            <button type="submit" class="btn bg-fire-engine-red mt-3 text-uppercase text-light">Login</button>
            
          </form>
        
        {/* <Footer/> */}
    </>
  )
}

export default Login