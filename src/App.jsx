import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute";

import "./index.css";

import InstitutionalLayout from "./components/Routing/layouts/InstitutionalLayout";
import AuthLayout from "./components/Routing/layouts/AuthLayout";
import BankLayout from "./components/Routing/layouts/BankLayout";


import ScrollToAnchor from "./utils/components/ScrollToAnchor";

import MoreInfo from "./components/Institutional/MoreInfo/MoreInfo";
import Institutional from "./components/Institutional/Institutional";
import Login from "./components/OnlineBank/Login/Login";
import Signup from "./components/OnlineBank/Signup/Signup";
import Movement from "./components/OnlineBank/Movement/Movement";
import Overview from "./components/OnlineBank/Overview/Overview";
import Contacts from "./components/OnlineBank/Contacts/Contacts";



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
          <Route path="signup" element={<Signup />} />
        </Route>


        {/* Banca en linea */}
        <Route path="user" element={<BankLayout />}>
          
          <Route index
            element={
              <PrivateRoute>
                <Overview />
              </PrivateRoute>
            } />

          <Route path="movements"
            element={
              <PrivateRoute>
                <Movement />
                </PrivateRoute>
            } />

            <Route path="contacts"
            element={
              <PrivateRoute>
                <Contacts />
                </PrivateRoute>
            } />



        </Route>

      </Routes>



    </>
  );
}

export default App;
