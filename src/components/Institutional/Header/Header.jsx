import { useState, useEffect } from "react"
import styles from "./Header.module.css"
import logo from "../../../assets/img/logo-no-background.png";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Acceso</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
