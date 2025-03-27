import './App.css'
import Hero from './components/Institutional/Hero/Hero'
import Services from './components/Institutional/Services/Services'
import Footer from './components/Institutional/Footer/Footer'
import Header from './components/Institutional/Header/Header'

function App() {
  

  return (
    <>
    <Header/>
    <Hero />
    <Services />
    {/* Footer position is bottom */}
    <Footer></Footer>
    </>
  )
}

export default App
