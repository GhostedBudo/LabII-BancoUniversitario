import React from 'react';
import styles from './HeaderOnlineBank.module.css';
import logo from '../../../assets/img/logo-no-background.png';
import exit from '../../../assets/img/icons8-salida-ColorOscuro.png';

const HeaderOnlineBank = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <img src={exit} alt="Logo" className={styles.exit} />
      
    </header>
  );
};

export default HeaderOnlineBank;