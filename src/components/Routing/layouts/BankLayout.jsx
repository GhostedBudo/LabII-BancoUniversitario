import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
import HeaderOnlineBank from '../../OnlineBank/Header/HeaderOnlineBank';
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import NavbarOnlineBank from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank';
const BankLayout = () => {
  return (
    <>
    
    <div className={styles.mainContainer}>
    <HeaderOnlineBank />
      <div className={styles.container}>
        
          <NavbarOnlineBank />
        
        <div className={styles.content}>

          <Outlet />
        </div>

      </div>
      <FooterBank />
    </div>
    </>
  )
}

export default BankLayout