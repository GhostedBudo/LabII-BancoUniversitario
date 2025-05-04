import React from "react";
import "./index.css";
import MoreInfo from "./components/Institutional/MoreInfo/MoreInfo";
import Institutional from "./components/Institutional/Institutional";
import InstitutionalLayout from "./components/Institutional/InstitutionalLayout";

import { Routes, Route } from "react-router-dom";

import ScrollToAnchor from "./utils/components/ScrollToAnchor";
import Login from "./components/OnlineBank/Login";
import BankLayout from "./components/OnlineBank/BankLayout";
import AuthLayout from "./components/OnlineBank/AuthLayout";

function App() {
  return (
    <>
      <ScrollToAnchor />

      <Routes>
        {/* Institutional */}

        <Route element={<InstitutionalLayout />}>

          <Route index path="/" element={<Institutional />} />
          <Route path="moreinfo" element={<MoreInfo />} />

        </Route>

        {/* Login y Registro */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>Sign Up</div>} />
        </Route>


        {/* Banca en linea */}
        <Route element={<BankLayout />}>
          <Route index path="user" element={<div>Usuario</div>} />
        </Route>

      </Routes>



    </>
  );
}

export default App;
