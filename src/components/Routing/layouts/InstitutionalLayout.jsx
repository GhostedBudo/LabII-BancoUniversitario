import React from 'react'
import { Outlet } from 'react-router-dom';
import FooterInstitutional from "../../Institutional/Footer/Footer";
import HeaderInstitutional from "../../Institutional/Header/Header";

const InstitutionalLayout = () => {
  return (
   <>
    <HeaderInstitutional />
        <Outlet />
    <FooterInstitutional />

    
   </>
  )
}

export default InstitutionalLayout