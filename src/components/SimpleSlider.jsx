import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

function SimpleSlider({children}) {
  const settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="">
  
      <Slider {...settings}>
        {/* <div >
          <h3 className="bg-danger mx-3">1</h3>
        </div>
        <div >
          <h3 className="bg-danger mx-3">2</h3>
        </div>
        <div >
          <h3 className="bg-danger mx-3">3</h3>
        </div>
        <div >
          <h3 className="bg-danger mx-3">4</h3>
        </div>
        <div >
          <h3 className="bg-danger mx-3">5</h3>
        </div>
        <div >
          <h3 className="bg-danger mx-3">6</h3>
        </div> */}
        {children}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
