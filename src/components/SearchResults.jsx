import React,{useEffect,useState, } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import Moviebox from './Moviebox';
import Header from '../pages/Header';
import Footer from '../pages/Footer';



const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",

};




const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;

function SearchResults() {
    // const { match } = props;
    // const query = match.params.query;


    const {query} = useParams(); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [color, setColor] = useState("#ffffff"); // State for loading indicator color
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(BASE_URL, {
              params: {
                query,
                api_key: process.env.REACT_APP_API_KEY,
              },
            });
    
            if (response.data && response.data.results) {
              setResults(response.data.results);
              setLoading(false);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); 
          }
        };

        fetchData();
      }, [query]);

     
  
  
  return (

    <>
<Header/>

{loading ? (
        <ClipLoader
          color={color}
          loading={loading}
          css={override} // Use 'css' instead of 'cssOverride'
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
<section className='bg-payne-gray light-charcoal mx-2 mx-md-4  font-vesper h4 p-3 text-capitalize'>found
    at least {results.length} results for "{query}"</section>
   
   
    <div className='row my-5 g-2 gy-2'>


  
    {results.map((movieReq) => (

    <Moviebox key={movieReq.id} {...movieReq} />
))}


    </div>
</>
      )}
    <Footer/>
    </>
  )
}

export default SearchResults

