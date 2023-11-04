import React,{useEffect,useState} from 'react'
import { useParams,Links, Link } from 'react-router-dom'
import Header from '../pages/Header';
import profImg from '../barbie500.jpg';
import Footer from '../pages/Footer';
// import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";
import { isAuthenticated } from '../utils/auth';
import axios from 'axios';

import Avatar from 'react-avatar';
import {FilmListTab, FilmListTabs} from '../components/FilmListTab';


function UserProfilepage() {
   const isLoggedIn = isAuthenticated();

  const {username} = useParams() ;
const [userData,setUserData] = useState(null)


useEffect(() => {
  const fetchUserDetails = async () => {
    try {
    
          const response = await axios.get(`https://damndaniel241.pythonanywhere.com/user-profile/${username}/`)
          setUserData(response.data)
          console.log(response.data)


             
    
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  fetchUserDetails();
}, [username]);


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




  return (
    <>
    <Header/>
  
{isLoggedIn ? (<>
  <section  id="user-page" className="container-md">
    <section className="d-flex justify-content-between my-5">
    <div className="d-flex gap-2">
    <Link className='no-link-decoration' data-bs-toggle="modal" data-bs-target="#ProfilePicId"><Avatar  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true}  /></Link>
    
 
    
  
    <div class="modal fade" id="ProfilePicId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm modal-md modal-lg modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">{username}'s profile picture</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-payne-gray">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="" />
          </div>
        </div>
      </div>
    </div>
    <script>
      const myModal = new bootstrap.Modal(document.getElementById('ProfilePicId'), options)
    
    </script>
      <div className="d-flex flex-column align-content-between align-items-center justify-content-center">
      <h5 id="prof-name"className='align-self-end text-light'>{username}</h5>
      <button type="button" className='bg-payne-gray text-capitalize text-light'>follow </button>
      </div>
    </div>
{/* 
    <div className="d-flex justify-content-center gap-4 flex-wrap mb-3">
    <div className="d-flex flex-column "><h3  className="text-light font-cormorant text-center">726</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>films</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant text-center">117</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>this year</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant text-center ">19</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>following</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant center text-center">726</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>followers</Link>
    </div>
  </div> */}

    </section>

    <section id="user-page" className="my-4 d-flex justify-content-center " style={{border:"3px solid #535b6f",padding:"1rem"}}>
      {/* <div className="bg-payne-gray"> */}
      <FilmListTabs >
      <FilmListTab label = {"tab0"} tabName={"FILMS"}>
        </FilmListTab>

        <FilmListTab label = {"tab1"} tabName={"REVIEWS"}>
        </FilmListTab>
        <FilmListTab label = {"tab2"} tabName={"WATCHLIST"}>
        </FilmListTab>
        <FilmListTab label = {"tab3"} tabName={"LIKES"}>
        </FilmListTab>
        <FilmListTab label = {"tab4"} tabName={"NETWORK"}>
        </FilmListTab>
      </FilmListTabs>
      {/* </div> */}
    </section>

  </section>




 </>)
 
 
 
 :(<> 
 
 
 <section className="d-flex flex-column justify-content-center gap-3 bg-payne-gray mb-3">

  <div className="d-flex justify-content-center gap-2">
    <Link className='no-link-decoration' data-bs-toggle="modal" data-bs-target="#ProfilePicId"><Avatar  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true}  /></Link>
    
 
    
  
    <div class="modal fade" id="ProfilePicId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm modal-md modal-lg modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">{username}'s profile picture</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-payne-gray">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="" />
          </div>
        </div>
      </div>
    </div>
    
    
    
    <script>
      const myModal = new bootstrap.Modal(document.getElementById('ProfilePicId'), options)
    
    </script>
    <h5 id="prof-name" className='align-self-end text-light'>{username}</h5>  </div>


  <div className="d-flex justify-content-center gap-4 flex-wrap mb-3">
    <div className="d-flex flex-column "><h3 className="text-light font-cormorant text-center">726</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>films</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant text-center">117</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>this year</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant text-center ">19</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>following</Link>
    </div>
    <div className="straight-line"></div>
    <div className="d-flex flex-column"><h3 className="text-light font-cormorant center text-center">726</h3>
    <Link to="" className='text-uppercase no-link-decoration light-charcoal'>followers</Link>
    </div>
  </div>
 </section>
 
 <section id='favourite-films' className=" mx-md-4 mx-2 row gx-2 mb-3 ">
  
 <div className='d-flex  justify-content-between'>
 <h6 className='no-link-decoration light-charcoal text-uppercase flex-start'>Favourite Films</h6>
    {/* <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase flex-start'>Favourite Films</Link> */}
    {/* <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>All</Link> */}
    <hr className='light-charcoal'/>
    </div>

  <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
  <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
  <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
  <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
  
   </section>
 

   <section id='recent-activity' className=" mx-md-4 mx-2 row gx-2 mb-3 ">
  
  <div className='d-flex  justify-content-between'>
  <h6 className='no-link-decoration light-charcoal text-uppercase flex-start'>recent activity</h6>
     {/* <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase flex-start'>Favourite Films</Link> */}
     {/* <Link to={`/film/${id}/${slugify(title)}/similar`} className='no-link-decoration light-charcoal text-uppercase '>All</Link> */}
     <hr className='light-charcoal'/>
     </div>
 
   <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
   <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
   <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
   <div className='col-3'><div className='card'><Link to="/" > <img className='card-img-top' src={profImg} alt="img" /></Link></div></div>
   
    </section>
  
 
 
   </>) 











}


    <Footer/>
    </>
  )
}

export default UserProfilepage



{/* <div className="flex gap-3 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} />
      <Avatar name="Junior" />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} />
      <Avatar name="Jane" />
      <Avatar size={50}  isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" round={true} />
      <Avatar name="ryangoslin99" />
    </div> */}