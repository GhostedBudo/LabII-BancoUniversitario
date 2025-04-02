import './index.css'
import CarouselSliderHero from './components/Institutional/Hero/carouselSliderHero'
import Services from './components/Institutional/Services/Services'
import Footer from './components/Institutional/Footer/Footer'
import Header from './components/Institutional/Header/Header'
import About from './components/Institutional/About/About'

function App() {
  

  return (
    <>
    <div className='main'>
      <Header/>


    <CarouselSliderHero />
    <Services />
    <About />

    {/* Footer position is bottom */}


    <Footer></Footer>
    </div>
    </>
  )
}

export default App
