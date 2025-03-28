
import Hero from './components/Institutional/Hero/Hero'
import Services from './components/Institutional/Services/Services'
import Footer from './components/Institutional/Footer/Footer'
import Header from './components/Institutional/Header/Header'
import About from './components/Institutional/About/About'

function App() {
  

  return (
    <>

      <Header/>


    <main>
    <Hero />
    <Services />
    <About />

    </main>
    {/* Footer position is bottom */}


    <Footer></Footer>
    </>
  )
}

export default App
