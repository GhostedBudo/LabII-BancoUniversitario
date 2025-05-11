import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
import HeaderOnlineBank from '../../OnlineBank/Header/HeaderOnlineBank';
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
const BankLayout = () => {
  return (
    <>
    
    <div className={styles.mainContainer}>
    <HeaderOnlineBank />
      <div className={styles.container}>
        <nav className={styles.navbar}>
          Bank Lateral NavBar
          <ul>
            <li>
              <Link to='/user'>Resumen Financiero</Link>
            </li>
            <li>
              <Link to="movements">Consulta de Movimientos</Link>
            </li>
            <li>
              <Link>Transferencia</Link>
            </li>
            <li>
              <Link>Contactos</Link>
            </li>
            <li>
              <Link>Actualizar Contrasenia</Link>
            </li>
          </ul>
        </nav>
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