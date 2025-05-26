import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
import HeaderOnlineBank from '../../OnlineBank/Header/HeaderOnlineBank';
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import NavbarOnlineBank from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank';
import NavbarOnlineBank2 from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank-alter';
import useAuth from '../../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';




const BankLayout = () => {// Start with null

  return (
    <div className={styles.layout}>
      <Toaster />
      <HeaderOnlineBank />
      <div className={styles.main}>
        <NavbarOnlineBank />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <FooterBank />
    </div>
  );
};

export default BankLayout; 