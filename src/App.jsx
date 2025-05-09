import React from "react";
import "./index.css";
import MoreInfo from "./components/Institutional/MoreInfo/MoreInfo";
import Institutional from "./components/Institutional/Institutional";
import InstitutionalLayout from "./components/Routing/layouts/InstitutionalLayout";

import { Routes, Route } from "react-router-dom";

import ScrollToAnchor from "./utils/components/ScrollToAnchor";
import Login from "./components/OnlineBank/Login/Login";
import BankLayout from "./components/Routing/layouts/BankLayout";
import AuthLayout from "./components/Routing/layouts/AuthLayout";
import PrivateRoute from "./components/Routing/PrivateRoute";

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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<div>Sign Up</div>} />
        </Route>


        {/* Banca en linea */}
        <Route element={<BankLayout />}>
          <Route path="user"
            element={
              <PrivateRoute>
                  <div>User Page</div>
              </PrivateRoute>
            } />
        </Route>

      </Routes>



    </>
  );
}

export default App;
