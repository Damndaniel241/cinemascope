import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import brandlogo from '../cinemascopelogo2.png';
import brandlogo2 from '../movie.png'
import '../styles/navbarStyles.css';
import classNames from 'classnames';
import axios from 'axios';
import MovieResults from '../components/MovieResults';
import slugify from 'react-slugify';
import Register from '../components/Register';
import LoginRegister from '../components/LoginRegister';
import {GiHamburgerMenu} from 'react-icons/gi'
import { FaSearch } from 'react-icons/fa';
import { isAuthenticated } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername,clearUser } from '../actionTypes/reducers/UserSlice';





const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function Header() {

  const dispatch = useDispatch();
  // const username = useSelector((state) => state.user.username);

  // useEffect(() => {
  //   // Retrieve the username from local storage
  //   const storedUsername = localStorage.getItem('username');

  //   // Set the username in your component
  //   if (storedUsername) {
  //     dispatch(setUsername(storedUsername));
  //   }
  // }, [dispatch]);
    
     const [searchOpen, setSearchOpen] = useState(false);
 

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchQuery(''); // Clear the search input when opening/closing
  };  

  const isLoggedIn = isAuthenticated();

    const location = useLocation();
    const isHomePage = location.pathname === '/' || location.pathname.startsWith('/film/');
    const [searchQuery,setSearchQuery] = useState();
    const navigate = useNavigate();


  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    // Redirect to the search results page with the search query
    navigate(`/search/${slugify(searchQuery)}`);
  };


  const removeItemFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  const username = localStorage.getItem('username');
  
  const handleLogout = () => {
    // Remove the token from localStorage
  
  
  // Assuming you have the user's token stored in local storage
  const userToken = localStorage.getItem('token');
 
  
  // Set the API endpoint URL
  const logoutUrl = 'https://damndaniel241.pythonanywhere.com/logout/'; // Replace with your actual endpoint URL

 
  console.log(userToken)
  // Create a headers object with the token
  const headers = {
    Authorization: `Token ${userToken}`,
  };
  
  // Send a POST request to log the user out
  axios.post(logoutUrl, {}, { headers })
    .then((response) => {
      // Handle successful logout
      console.log(response.data.detail); // Should print 'Successfully logged out'
  
      // You may want to clear the user's token from local storage here
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // updateUsername(null); 
     
   
      // dispatch(clearUser());
      navigate("/");
    })

    .catch((error) => {
      // Handle errors (e.g., network issues, server errors)
      console.error('Logout failed:', error);
    });
  
    
   
    // Redirect the user to the logout endpoint (e.g., '/logout')
   
    // You can use react-router-dom to navigate to the logout page or send a request to your Django logout endpoint.
  };
  
   


    const navbarClasses = classNames(
        'navbar',
        'navbar-expand-sm',
        'navbar-expand-lg',
        'img-fluid',
        {'transparent-bg':isHomePage},
        {'colored-bg':!isHomePage}
    );


    // console.log(isHomePage);

  return (
    <>
    <nav className={navbarClasses}>
          <div className="container-lg">
            <Link className="navbar-brand" to="/"><img className="logo" src={brandlogo} alt="Company Logo" /></Link>
            <a className="navbar-toggler text-white d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */} <GiHamburgerMenu/>
            </a>
            <div className="collapse navbar-collapse " id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0 text-white d-flex flex-wrap">

                {isLoggedIn ? (<> <li className="nav-item "> <button onClick={handleLogout}  className="nav-link  text-white" href="#">Log out</button> </li></>):( <>
                    <li className="nav-item ">
                        {/* <LoginRegister classNames="nav-link active text-white">Sign in</LoginRegister> */}
                        <Link to="/login" className="nav-link  text-white" href="#">Sign in</Link>
                    </li>
                  

                    <li className="nav-item">
                        {/* <Register  classNames="nav-link text-white" >create account</Register> */}
                        
                        <Link to="/signup" className="nav-link  text-white" href="#">Create Account</Link>
                    </li>
                  </>)}

                    <li className="nav-item">
                        <Link className="nav-link  text-white" href="#">films</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="#">members</Link>
                    </li>
                    {isLoggedIn &&(
                    <li className="nav-item dropdown">
                        <Link className="nav-link text-white dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{username}</Link>
                        <div className="dropdown-menu bg-payne-gray" aria-labelledby="dropdownId">
                            <Link to={`/${username}`} className="dropdown-item" href="#">Home</Link>
                            <Link to={`/${username}/film/id/moveTitle`}className="dropdown-item" href="#">check review</Link>
                            <Link className="dropdown-item" href="#">Settings</Link>
                        </div>
                    </li>
                    )}
                </ul>
                
   {/* <input className="form-control rounded-8 me-sm-2  fs-1rem" type="text"  placeholder="Search movie.." value={searchQuery}  onChange={handleSearchInputChange}/> */}
                    {/* <button className="btn btn-outline-danger my-2 my-sm-0  fs-1rem" type="submit">Search</button> */}

                    {/* <div class="search-box">
                    <form className="d-flex my-2 my-lg-0" onSubmit={handleSearchFormSubmit}>
    <button type="submit" class="btn-search" ><FaSearch/></button>
    <input  type="text" class="input-search" placeholder="Search Movie..." value={searchQuery}  onChange={handleSearchInputChange}/>
    </form>
  </div> */}
  {/* <div class="searchBox"> */}
       <form className="searchBox" onSubmit={handleSearchFormSubmit}>
            <input className="searchInput"type="text" name="" placeholder="Search Movie..." value={searchQuery}  onChange={handleSearchInputChange}/>
            <button type="submit" className="searchButton"   >
                <FaSearch className='searchButton'/>
            </button>
            {/* <FaSearch className='searchButton'/> */}
            </form>
        {/* </div> */}

  
             
            </div>
      </div>
    </nav>
    
  
    
    
    </>
  )
}

export default Header






  // // Function to handle search input change
  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // Function to handle form submission
  // const handleSearchFormSubmit = (event) => {
  //   event.preventDefault();
  //   // Redirect to the search results page with the search query
  //   navigate(`/search/${searchQuery}`);
  // };



  // <form className="d-flex my-2 my-lg-0" onSubmit={handleSearchFormSubmit}>
  // <input className="form-control me-sm-2" type="text"  placeholder="Search" value={searchQuery}  onChange={handleSearchInputChange}/>









//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (query.trim() === '') {
//       setResults([]);
//       return;
//     }

//     const fetchData = async () => {
//     try {
//       const response = await axios.get(BASE_URL, {
//         params: {
//           query,
//           api_key: process.env.REACT_APP_API_KEY,
         
//           // Other query parameters if needed
//         },
//       });

//       if (response.data && response.data.results) {
//         setResults(response.data.results);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, [query]);



