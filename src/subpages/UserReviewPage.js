import React,{useEffect,useState} from 'react'
import { isAuthenticated } from '../utils/auth';
import {Link,useParams,useLocation} from 'react-router-dom';
import axios from 'axios';
import { FaHeart,FaStar } from 'react-icons/fa';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import Avatar from 'react-avatar';
import profImg from '../barbie500.jpg';
import {BsDistributeVertical,BsFillEyeFill,BsFillStopwatchFill} from 'react-icons/bs';
import { ToastContainer,toast } from 'react-toastify';
import { useReviewData } from '../utils/context/ReviewContext';
import {reservelogo,noImage} from '../index';
import { FilmListTabs,FilmListTab } from '../components/FilmListTab';
import slugify from 'react-slugify';
import UserCinemaCard from '../components/UserCinemaCard';
import ReviewCard from '../components/ReviewCard';
import {useQuill} from 'react-quilljs';

const API_IMAGE = "https://image.tmdb.org/t/p/w500/" ;
const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=';

function UserReviewPage(props) {
    const isLoggedIn = isAuthenticated();

    const {id,username} = useParams();

    const { reviewData } = useReviewData();


    const [text,setText] = useState('');

    const handleChange = (event) => {
      setText(event.target.value);
    };

    const handleCommentSubmit =async (e) => {
      e.preventDefault();
    

     try{ 
      
      const response = await axios.post('https://damndaniel241.pythonanywhere.com/create-comment/', { content: text, review: reviewData.id,
        }, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`, // Include the user's token
          }})
          
        .then((response) => {
          console.log(response.data);
          toast.success('comment posted!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
      }
      catch  (error) {
        // .catch((error) => {
          console.error('Error posting content:', error);
        // });
    };
    } 

    // console.log(reviewData)
    const [API_IMAGE_BIG, setAPIImageBig] = useState("https://image.tmdb.org/t/p/w1280/");

    const [value,setValue] = useState();
    const { quill, quillRef } = useQuill();
    const [successMessage, setSuccessMessage] = useState('');
  
    useEffect(()=>{
     
      if (quill) {
          quill.root.dataset.placeholder = 'write something here.....';
          quill.on('text-change', (delta, oldDelta, source) => {
              quill.root.dataset.placeholder = '';
              console.log(quill.root.innerHTML);
        })
      }
  },[quill])
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const content = quill.root.textContent;
    setValue(content);
    // props.handleCallback(content); 
  
    try {
      
      const response = await axios.post('https://damndaniel241.pythonanywhere.com/create-review/', {
        content: content, // Use the 'value' state to send the review content
        movie_id: id,
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`, // Include the user's token
        },
      });
      console.log(response.data.message); // Success message from Django
      toast.success('🦄 Review Successfully submitted!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  }
  

  function callBack(childData){
  
    return (<>
    <p>{childData}</p>
    </>)
  }


  const [comments,setComments] = useState([]);
  const reviewId  = reviewData.id

  useEffect(() => {
    axios.get(`https://damndaniel241.pythonanywhere.com/comments/review/${reviewId}/`)
        .then(response => {
            setComments(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}, [reviewId]);



// const [movieTrailer,setMovieTrailer] = useState(null);
// const [youtubeTrailerKey,setYoutubeTrailerKey] = useState(null);

//     const mainTrailer = reviewData.movieData.videos.results.find(video => video.type === "Trailer" && video.name === "Main Trailer");
//     const filteredVideos = mainTrailer
//     ? [mainTrailer]
//     : reviewData.movieData.videos.results.filter(video => video.type === "Trailer");
  
//     // console.log(filteredVideos[0].key)
//     // console.log(filteredVideos);
//     if (filteredVideos.length > 0) {
  
//       const youtubeKey = filteredVideos[0].key;
//       const trailerLink = `${YOUTUBE_LINK}${filteredVideos[0].key}`
//         setYoutubeTrailerKey(youtubeKey)
//         setMovieTrailer(trailerLink) 
//         console.log(filteredVideos[0])
//     }else {
//       // Handle the case where there are no videos
//       // setMovieTrailer(""); // Or set it to some default value or handle it in your app logic
//     }

    const [movieData, setMovieData] = useState([]);

    const [movieDirector, setMovieDirector] = useState(null);
    const [movieCast, setMovieCast] = useState([])
    const [movieCrew, setMovieCrew] = useState([])
    const [AlternateTitles, setAlternateTitles] = useState([]);














    
    useEffect(() => {
      // Function to update API_IMAGE_BIG based on innerWidth
      const updateImageSize = () => {
        if (window.innerWidth < 768) {
          setAPIImageBig("https://image.tmdb.org/t/p/w500/");
  
          if(window.innerWidth>517){
            setAPIImageBig("https://image.tmdb.org/t/p/w780/");
          }
        } else {
          setAPIImageBig("https://image.tmdb.org/t/p/w1280/");
        }
      };
      updateImageSize();
      window.addEventListener('resize', updateImageSize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', updateImageSize);
      };
  
      // Include any other dependencies from your existing useEffect here
    }, []); 
  



  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Update the screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const intUrl = reviewData.movieData.backdrop_path ? API_IMAGE_BIG+reviewData.movieData.backdrop_path : reservelogo;

const backdrop_inlineStyle = {
  backgroundImage: "linear-gradient(-180deg, rgba(250,247,242,0) 49%, rgba(43,45,65,1) 76%), url(" + intUrl+ ")"
  
}


  return (
    <>
    <Header/>
  
         
    {!isLoggedIn ? (<>
    
      <section style={backdrop_inlineStyle} className=' height-100vh height-50vh lg-bg-repeat-round bg-no-repeat bg-pos-center  d-flex flex-column position-relative '>
      
      </section>
    <section className='d-flex  justify-content-between align-item-center mx-md-4 mx-2  my-4'>
        <div className='align-self-center'>

            <Link to={`/${username}`} className='no-link-decoration light-charcoal '><Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/>{username}</Link>
            <div className="light-charcoal align-self-center ">
        <div className='d-flex flex-column-md gap-2'>
        <h5 className="text-light h1 text-capitalize font-cormorant"><Link to={`/film/${id}/${slugify(reviewData.movieData.title)}`} target='_blank' className='no-link-decoration text-light'>{reviewData.movieData.title}</Link></h5>
        <h5 className='align-self-center'>{reviewData.movieData.release_date.slice(0,4)}</h5>
      </div>
      <FaStar/>
     <h6 style={{fontSize:"0.567rem"}}className='light-charcoal'>Watched on Oct 18, 2023</h6>
        </div>


        </div>
       

        <img className='card-img-top w-25' src={`${API_IMAGE}`+`${reviewData.movieData.poster_path}`} alt="img" />
        </section> 
        
        <section className='mx-md-4 mx-2  my-5 light-charcoal'> {reviewData.content}</section>

<div className='bg-payne-gray light-charcoal text-capitalize text-center py-3 mb-2 mx-md-4 mx-2 rounded-1  '>
    <Link to="/login" className='no-link-decoration light-charcoal'>Sign in to log, rate or review</Link>
</div>

<section className='light-charcoal mx-md-4 mx-2 my-3'>
            
            <h5 className="text-start">comment?</h5>
            <hr/>
            <h6 className="text-start text-capitalize payne-gray">please <Link className="light-charcoal no-link-decoration" to="/login">sign in</Link> to reply.</h6>

            
        </section>


        <section className="mx-md-4 mx-2">
        <div className='d-flex  justify-content-between '>
    <Link to="/" className='no-link-decoration light-charcoal text-uppercase '>{comments.length} comments</Link>

    </div>
    <hr className=' light-charcoal'/>


    {comments.map((comment)=>(<>
    
    <div className='d-flex justify-content-between' key={comment.id}>
<div className='d-flex gap-2'>
  <Link style={{fontSize:"0.5678rem"}} className='no-link-decoration light-charcoal' to={`/${comment.user_username}`}> <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/> {comment.user_username} </Link>
</div>

<h6 className='light-charcoal'>{comment.content}</h6> 


    </div>
    </>))}
    </section>


        <div className='bg-payne-gray light-charcoal text-capitalize my-5  ps-3 py-3 mb-2 mx-md-4 mx-2 rounded-1  '>
    <Link to={`/${username}`} className='no-link-decoration about-blue'>{username}</Link> is using cinemascope to share film reviews and lists with friends.<Link to="/signup" className='no-link-decoration about-blue text-capitalize '>join here</Link>
</div>


        
        </>): 
        // design for loggedin
        
        (

  <>

<section style={backdrop_inlineStyle} className=' height-100vh height-50vh lg-bg-repeat-round bg-no-repeat bg-pos-center  d-flex flex-column position-relative '>
      
      </section>
      {/* design for portrait */}
      {screenWidth  < 995 ? ( <>
        <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>


<FilmListTabs>
<FilmListTab label = {"tab0"} tabName={"WATCH ACTIVITY"} className="">
<div className=" d-flex flex-column justify-content-center align-items-center gap-2 my-5">
<UserCinemaCard className="" src={reviewData.movieData.poster_path ? API_IMAGE + reviewData.movieData.poster_path : noImage} movie_title={reviewData.movieData.title} watched="1.8M" appeared="239k" liked="821k"/>
  </div>

  </FilmListTab>

  <FilmListTab label = {"tab1"} tabName={"SEE REVIEW"} className="">
  <div className="col-11 my-5 mx-2">
    <div className='payne-gray'>
    <Link to={`/${reviewData.user_username}`} className='no-link-decoration light-charcoal '><Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/></Link > reviewed by <Link  to={`/${reviewData.user_username}`} className="light-charcoal no-link-decoration">{reviewData.user_username}</Link>
    </div>
    <hr className='light-charcoal'/>

    <span className='d-flex gap-2'><h5 className="light-charcoal"><Link to={`/film/${reviewData.movie}/${slugify(reviewData.movieData.title)}`} className='no-link-decoration text-light font-vesper'  >{reviewData.movieData.title}</Link></h5><h6 style={{fontSize:"0.567rem"}} className='payne-gray align-self-center'>{reviewData.movieData.release_date.slice(0,4)}</h6> 
    <span className='d-flex light-charcoal'><FaStar/><FaStar/> <FaStar/></span> </span>
    <h6 style={{fontSize:"0.567rem"}}className='payne-gray'>Watched on Oct 18, 2023</h6>
    <h5 style={{fontSize:"0.875rem"}} className='light-charcoal'>
      {reviewData.content}
    </h5>
    <div></div>



    <section className="mx-md-4 mx-2">
        <div className='d-flex  justify-content-between '>
    <Link to="/" style={{fontSize:"0.5678rem"}} className='no-link-decoration light-charcoal text-uppercase '>{comments.length} comments</Link>

    </div>
    <hr className=' light-charcoal'/>

    {comments.map((comment)=>(<>
    
    <div className='d-flex justify-content-between ' key={comment.id}>
<div className='d-flex gap-2'>
  <Link className='no-link-decoration light-charcoal' to={`/${comment.user_username}`}> <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/> {comment.user_username} </Link>
</div>


<h6  style={{fontSize:"0.5678rem"}} className='light-charcoal align-self-center '>{comment.content}</h6> 


    </div>
    </>))}
    </section>

    <div>
    <form onSubmit={handleCommentSubmit}>
    <div className='d-flex gap-2 flex-column my-5 '>
                <textarea
                 rows={10}
                 cols={50}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your comment..."
                />
                <button className='align-self-end text-light bg-about-green rounded-2 p-2' style={{backgroundColor:"#00971B"}} type="submit">post</button>
                </div>
            </form>

    </div>

   </div>


    </FilmListTab>

    <FilmListTab label = {"tab2"} tabName={"MAKE A REVIEW"} className="">

  <div className=" d-flex flex-column  justify-content-center align-items-center my-5 ">
 
 <ReviewCard setSuccessMessage={setSuccessMessage}  handleCallback={callBack} className=""/>
 </div>
      </FilmListTab>
</FilmListTabs>
      
      
      
      </>):
      
      // design for landscape
      (<>
   <section className="row gx-2">

<ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

<div className="col-3 d-flex flex-column justify-content-center align-items-center gap-2">
<UserCinemaCard className="" src={reviewData.movieData.poster_path ? API_IMAGE + reviewData.movieData.poster_path : noImage} movie_title={reviewData.movieData.title} watched="1.8M" appeared="239k" liked="821k"/>

</div>

<div className="col-5">

<div className="col-11 my-5 mx-2">
    <div className='payne-gray'>
    <Link to={`/${reviewData.user_username}`} className='no-link-decoration light-charcoal '><Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/></Link > reviewed by <Link  to={`/${reviewData.user_username}`} className="light-charcoal no-link-decoration">{reviewData.user_username}</Link>
    </div>
    <hr className='light-charcoal'/>

    <span className='d-flex gap-2'><h5 className="light-charcoal"><Link to={`/film/${reviewData.movie}/${slugify(reviewData.movieData.title)}`} className='no-link-decoration text-light font-vesper'  >{reviewData.movieData.title}</Link></h5><h6 style={{fontSize:"0.567rem"}} className='payne-gray align-self-center'>{reviewData.movieData.release_date.slice(0,4)}</h6> 
    <span className='d-flex light-charcoal '><FaStar/><FaStar/> <FaStar/></span> </span>
    <h6 style={{fontSize:"0.567rem"}}className='payne-gray'>Watched on Oct 18, 2023</h6>
    <h5 style={{fontSize:"0.875rem"}} className='light-charcoal'>
      {reviewData.content}
    </h5>

    <section className="mx-md-4 mx-2">
        <div className='d-flex  justify-content-between '>
    <Link to="/" className='no-link-decoration light-charcoal text-uppercase '>{comments.length} comments</Link>

    </div>
    <hr className=' light-charcoal'/>


    {comments.map((comment)=>(<>
    
    <div className='d-flex justify-content-between' key={comment.id}>
<div className='d-flex gap-2'>
  <Link className='no-link-decoration light-charcoal' style={{fontSize:"0.5678rem"}} to={`/${comment.user_username}`}> <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} size={25} style={{marginRight:"4px"}}/> {comment.user_username} </Link>
</div>


<h6 className='light-charcoal'>{comment.content}</h6> 


    </div>
    </>))}
    </section>






    <div>
    <form onSubmit={handleCommentSubmit}>
      <div className='d-flex gap-2 flex-column my-5 '>
                <textarea
                className=''
                rows={10}
                cols={50}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your comment..."
                />
                <button className='align-self-end text-light bg-about-green rounded-2 p-2' style={{backgroundColor:"#00971B"}} type="submit">post</button>
                </div>
            </form>

    </div>

   </div>
</div>
<div className="col-4 d-flex flex-column  justify-content-center align-items-center ">
   
 <ReviewCard setSuccessMessage={setSuccessMessage}  handleCallback={callBack} className=""/>
</div>

</section>




      </>)}





</>

)}

        
        
        
    <Footer/>
    </>
  )
}

export default UserReviewPage















