import React from 'react'
import Services from "./Services/Services";

import CarouselSliderHero from "./Hero/carouselSliderHero";
import About from "./About/About";
import Priority from "./Priority/Priority";


const Institutional = () => {
    return (
        <>
          
    
          <div className="main">
            <CarouselSliderHero />
            <Services id="services" />
            <About />
            <Priority />
            {/* <MoreInfo /> */}
          </div>
    
         
        </>
      );
}

export default Institutional