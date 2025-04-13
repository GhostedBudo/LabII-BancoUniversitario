import React from 'react'
import './index.css'
import Hero from './components/Institutional/Hero/Hero'
import Services from './components/Institutional/Services/Services'
import Footer from './components/Institutional/Footer/Footer'
import Header from './components/Institutional/Header/Header'
import CarouselSliderHero from './components/Institutional/Hero/carouselSliderHero'
import About from './components/Institutional/About/About'

function App() {
  

  return (
    <>
   
    <Header/>
   
    <div className='main'>
    
   
    <CarouselSliderHero />



    
    <Services />
   

  
    <About />

    {/* Footer position is bottom */}


    </div>
    <Footer></Footer>
    </>
  )
}

export default App
