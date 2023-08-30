import React from 'react';
import Header from './Header';
import whitelogo from '../whitebackground.png';
export {whitelogo}

function Home() {
    const backgroundImageUrl = 'url('+whitelogo+')' ;

    const inlineStyles = {
        backgroundImage: backgroundImageUrl,
        background: 'linear-gradient(103deg, rgba(2,0,36,1) 0%, rgba(20,20,22,0.6643032212885154) 21%, rgba(17,20,20,0.6474964985994398) 75%, rgba(17,20,20,1) 100%)',
        // backgroundblendMode:multiply,

       
      };

  return (
    <div className='home'>
        <section style={inlineStyles} id="header">
             <Header/>
             <h1 className='vertical-text'>ryan hagel</h1>
        {/* <img src={whitelogo} style={{ width: "100%"}} alt="background white"/> */}
        </section>
   
        
    </div>
  )
}

export default Home