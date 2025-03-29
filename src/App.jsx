import React from 'react'
import './index.css'
import Hero from './components/Institutional/Hero/Hero'
import Services from './components/Institutional/Services/Services'
import Footer from './components/Institutional/Footer/Footer'
import Header from './components/Institutional/Header/Header'
import CarouselSliderHero from './components/Institutional/Hero/carouselSliderHero'

function App() {
  

  return (
    <>
   
    <Header/>
    <main>
    <Hero />
   
    <CarouselSliderHero />



    
    <Services />
    </main>
    {/* Footer position is bottom */}


    <Footer></Footer>
    </>
  )
}

export default App
