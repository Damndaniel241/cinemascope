import React,{useState} from 'react';





const [currentPage, setCurrentPage] = useState(1);
const [movieData, setMovieData] = useState([]);


useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: 'YOUR_API_KEY',
          page: currentPage, // Include the current page number
        },
      })
      .then((response) => {
        setMovieData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [currentPage]); // Make sure to include currentPage in the dependency array


  return (
    <div>
      {movieData.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          {/* Render other movie details */}
        </div>
      ))}
      <button onClick={loadNextPage}>Load Next Page</button>
    </div>
  );


  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const loadPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  
  
