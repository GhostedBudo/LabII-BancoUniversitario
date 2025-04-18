
import { useState, useEffect } from "react"
import styles from "./Header.module.css"
import logo from "../../../assets/img/logo-no-background.png"; 
import userIcon from "../../../assets/icon/iconUsuarioVerde.png"
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
              <img src={logo} alt="Banco Universitario" className={styles.logo} />
            </div>
            <div className={styles.userIcon}>
              <div className={styles.userCircle}>
                <img src={userIcon} alt="Usuario" className={styles.userImage} />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <ul>
                  <li>
                    <a href="#servicios" onClick={toggleMobileMenu}>
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#nosotros" onClick={toggleMobileMenu}>
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#contactos" onClick={toggleMobileMenu}>
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
            <img src={logo} alt="Banco Universitario" className={styles.logo} />
          </div>
          <div className={styles.desktopRightSection}>
            <nav className={styles.desktopNav}>
              <ul>
                <li>
                  <a href="#servicios">Servicios</a>
                </li>
                <li>
                  <a href="#nosotros">Nosotros</a>
                </li>
                <li>
                  <a href="#contactos">Contactos</a>
                </li>
              </ul>
            </nav>
            <div className={styles.accessButton}>
              <img src={userIcon} alt="Usuario" className={styles.accessButtonIcon} />
              <span>Acceso</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
