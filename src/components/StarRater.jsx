import { FaStar } from "react-icons/fa";
import React,{useState} from 'react'

export const StarRater = (props) => {
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);

    // console.log(rating)
  return (
    <div className="d-flex justify-content-center ">
        {[...Array(5)].map((star,i) =>{
            const ratingValue = i+1;
            return  (<label>
                <input type="radio" name="rating" value={ratingValue} onClick={()=>setRating(ratingValue)}  
               />
                <FaStar className="star" color={ratingValue <= (hover || rating) ? '#40BCF4': '#9197a5'} size={30} 
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={()=> setHover(null)}
                /></label>)
               
        })}
     
     {props.handleCallback(rating)}

    </div>
  )
}
