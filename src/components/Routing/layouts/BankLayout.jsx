import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
const BankLayout = () => {
  return (
    <>
    <div className={styles.mainContainer}>

      <header className={styles.header}> Bank Header</header>
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
      <footer className={styles.footer}>Bank footer</footer>
    </div>
    </>
  )
}

export default BankLayout