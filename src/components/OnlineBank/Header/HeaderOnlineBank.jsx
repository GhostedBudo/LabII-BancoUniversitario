import React from 'react';
import styles from './HeaderOnlineBank.module.css';
import logo from '../../../assets/img/logo-no-background.png';
import exit from '../../../assets/img/icons8-salida-ColorOscuro.png';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';



const HeaderOnlineBank = () => {
  const {logout, getJwtToken } = useAuth(); 
  const navigate  = useNavigate(); 

  function handleClick() {
      // console.log("Saliendo");
      logout(); 
      // console.log(getJwtToken()); 
      navigate('/login'); 

  }
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <img src={exit} alt="Logo" className={styles.exit} onClick={handleClick}/>
      
    </header>
  );
};

export default HeaderOnlineBank;