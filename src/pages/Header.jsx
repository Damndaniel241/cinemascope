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



const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function Header() {
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

   


    const navbarClasses = classNames(
        'navbar',
        'navbar-expand-sm',
        'navbar-expand-lg',
        'img-fluid',
        {'transparent-bg':isHomePage},
        {'colored-bg':!isHomePage}
    );


    console.log(isHomePage);

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
                    <li className="nav-item ">
                        <LoginRegister classNames="nav-link active text-white">Sign in</LoginRegister>
                    </li>
                    <li className="nav-item">
                        <Register  classNames="nav-link text-white" >create account</Register>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link  text-white" href="#">films</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="#">members</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link text-white dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" href="#">Action 1</Link>
                            <Link className="dropdown-item" href="#">Action 2</Link>
                        </div>
                    </li>
                </ul>
                // <form className="d-flex my-2 my-lg-0" onSubmit={handleSearchFormSubmit}>
   <input className="form-control rounded-8 me-sm-2  fs-1rem" type="text"  placeholder="Search movie.." value={searchQuery}  onChange={handleSearchInputChange}/>

                    <button className="btn btn-outline-danger my-2 my-sm-0  fs-1rem" type="submit">Search</button>
                </form>
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



