import React from "react";
import "./index.css";
import Services from "./components/Institutional/Services/Services";
import Footer from "./components/Institutional/Footer/Footer";
import Header from "./components/Institutional/Header/Header";
import CarouselSliderHero from "./components/Institutional/Hero/carouselSliderHero";
import About from "./components/Institutional/About/About";
import Priority from "./components/Institutional/Priority/Priority";
import MoreInfo from "./components/Institutional/MoreInfo/MoreInfo";

function App() {
  return (
    <>
      <Header />

      <div className="main">
        <CarouselSliderHero />
        <Services id="services" />
        <About />
        <Priority />
        <MoreInfo />
      </div>

      <Footer></Footer>
    </>
  );
}

export default App;
