import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbarOnlineBank.module.css';

// Importa tus iconos (ajusta las rutas según tu estructura de archivos)
import ResumenIcon from '../../../assets/img/icons8-ordenación-trasera.png';
import MovimientosIcon from '../../../assets/img/icons8-ver-archivo.png';
import TransferIcon from '../../../assets/img/icons8-transferencia-de-dinero.png';
import ContactosIcon from '../../../assets/img/icons8-contacto-de-negocio.png';
import PasswordIcon from '../../../assets/img/icons8-contraseña.png';


const NavbarOnlineBank = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navBackground}>
      </div>
      <div className={styles.navContent}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to='/user' className={styles.navLink}>
              <img src={ResumenIcon} alt="Resumen" className={styles.navIcon} />
              Resumen Financiero
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="movements" className={styles.navLink}>
              <img src={MovimientosIcon} alt="Movimientos" className={styles.navIcon} />
              Consulta de Movimientos
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/transfer" className={styles.navLink}>
              <img src={TransferIcon} alt="Transferencia" className={styles.navIcon} />
              Transferencia
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contacts" className={styles.navLink}>
              <img src={ContactosIcon} alt="Contactos" className={styles.navIcon} />
              Contactos
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/update-password" className={styles.navLink}>
              <img src={PasswordIcon} alt="Contraseña" className={styles.navIcon} />
              Actualizar Contraseña
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarOnlineBank;