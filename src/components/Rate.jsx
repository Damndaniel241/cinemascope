import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { FaStar } from "react-icons/fa";

const Rate = ({count,rating,color,onRating}) => {

    const starRating = useMemo(() => {
        return Array(count)
                    .fill(0)
                    .map((_,i)=> i+1)
                    .map(idx => {
                        <FaStar key={idx}
                        className='cursor-pointer'
                        onClick={()=>onRating(idx)}
                        />
                    }) 

    },[count,rating])


  return (
    <div>
    {starRating}
    </div>
  )
  }

Rate.propTypes = {
    count:PropTypes.number,
    rating:PropTypes.number,
    onchange:PropTypes.func,
    color:{
        filled:PropTypes.string,
        unfilled:PropTypes.string
    }

   
}

Rate.defaultProps = {
    count:5,
    rating:0,
    color:{
        filled:"#f5eb3b",
        unfilled:"dcdcdc",
    }
    
}

export default Rate