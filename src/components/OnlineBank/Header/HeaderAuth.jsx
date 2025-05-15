// src/components/Header/HeaderAuth.jsx

import React from 'react';
import styles from './HeaderAuth.module.css';
import logo from '../../../assets/img/logo-no-background.png';
import { Link } from 'react-router-dom';

const HeaderAuth = () => {
  return (
    <header className={styles.header}>

 
     
       <Link to={'/'}>
       
       <img src={logo} alt="Logo"  className={styles.logo}  />
       </Link> 
        <h1 className={styles.title}>Banca En Línea</h1>
    </header>
  );
};

export default HeaderAuth;
