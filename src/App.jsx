import React from "react";
import "./index.css";
import MoreInfo from "./components/Institutional/MoreInfo/MoreInfo";
import Institutional from "./components/Institutional/Institutional";
import Footer from "./components/Institutional/Footer/Footer";
import Header from "./components/Institutional/Header/Header";
import { Routes, Route } from "react-router-dom";
import ScrollToAnchor from "./utils/components/ScrollToAnchor";
function App() {
  return (
    <>
      <ScrollToAnchor />
      <Header />

      <Routes>
        <Route path="/" element={<Institutional />} />
        <Route path="/moreinfo" element={<MoreInfo />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
