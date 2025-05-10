import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAuth from '../../OnlineBank/Header/HeaderAuth'
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import styles from './AuthLayout.module.css'
const AuthLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <HeaderAuth />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      <FooterBank />
    </div>
  );
};

export default AuthLayout;