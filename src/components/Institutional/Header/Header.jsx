import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/img/logo-no-background.png";
import { Link } from "react-router-dom";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#085F63">
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-6"
    >
      <path
        fill-rule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clip-rule="evenodd"
      />
    </svg>
  );

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.mobileMenu}>
          <button onClick={toggleMenu} className={styles.burgerButton}>
            {menuOpen ? closeIcon : burgerIcon}
          </button>
        </div>

        <div className={styles.logoContainer}>
          <Link to="/#home">
            <img src={logo} alt="Banco Universitario" />
          </Link>
        </div>

        <div className={styles.navbar}>
          <Link to="/#services"> <span>Servicios</span></Link>
          <Link to="/#about"><span>Nosotros</span></Link>
          <Link to="/#priority"><span>Prioridades</span></Link>
          <Link to="/#contact"><span>Contacto</span></Link>
        </div>

        <div className={styles.access}>
          <button className={styles.accessButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <Link to={'/signup'} className={styles.accessText}>Registro</Link>
          </button>
        </div>
      </header>

      <div className={`${menuOpen ? styles.dropDown : styles.inactive}`}>
        <Link to="#services">Servicios</Link>
        <Link to="#about">Nosotros</Link>
        <Link to="#priority">Prioridades</Link>
        <Link to="#contact">Contactos</Link>
      </div>
    </div>
  );
}

export default Header;
