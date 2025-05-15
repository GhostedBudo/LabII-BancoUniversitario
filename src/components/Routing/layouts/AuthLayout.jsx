import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAuth from '../../OnlineBank/Header/HeaderAuth'
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import styles from './AuthLayout.module.css'

import toast, { Toaster } from 'react-hot-toast';

const AuthLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Toaster />
      <HeaderAuth />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      <FooterBank />
    </div>
  );
};

export default AuthLayout;