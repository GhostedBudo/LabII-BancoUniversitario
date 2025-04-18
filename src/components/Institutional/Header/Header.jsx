import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/img/logo-no-background.png";
import userIcon from "../../../assets/icon/iconUsuarioVerde.png";
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      {isMobile ? (
        <>
          <div className={styles.mobileHeader}>
            <button className={styles.hamburgerMenu} onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className={styles.logoContainer}>
              <a href="#home">
                <img
                  src={logo}
                  alt="Banco Universitario"
                  className={styles.logo}
                />
              </a>
            </div>
            <div className={styles.userIcon}>
              <div className={styles.userCircle}>
                <img
                  src={userIcon}
                  alt="Usuario"
                  className={styles.userImage}
                />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <ul>
                  <li>
                    <a href="#services" onClick={toggleMobileMenu}>
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#about" onClick={toggleMobileMenu}>
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#contact" onClick={toggleMobileMenu}>
                      Contactos
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className={styles.desktopHeader}>
          <div className={styles.logoContainer}>
            <a href="#home">
              <img
                src={logo}
                alt="Banco Universitario"
                className={styles.logo}
              />
            </a>
          </div>
          <div className={styles.desktopRightSection}>
            <nav className={styles.desktopNav}>
              <ul>
                <li>
                  <a href="#services">Servicios</a>
                </li>
                <li>
                  <a href="#about">Nosotros</a>
                </li>
                <li>
                  <a href="#contact">Contactos</a>
                </li>
              </ul>
            </nav>
            <div className={styles.accessButton}>
              <img
                src={userIcon}
                alt="Usuario"
                className={styles.accessButtonIcon}
              />
              <span>Acceso</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
