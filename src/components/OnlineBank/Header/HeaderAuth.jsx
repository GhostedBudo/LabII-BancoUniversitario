// src/components/Header/HeaderAuth.jsx

import React from 'react';
import styles from './HeaderAuth.module.css';
import logo from '../../../assets/img/logo-no-background.png';

const HeaderAuth = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Banca En Línea</h1>
    </header>
  );
};

export default HeaderAuth;
