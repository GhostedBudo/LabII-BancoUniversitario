import React from 'react'
import { Outlet } from 'react-router-dom';
import FooterInstitutional from "./Footer/Footer";
import HeaderInstitutional from "./Header/Header";

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