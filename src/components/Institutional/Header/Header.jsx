import React from 'react'
import styles from './Header.module.css'
import { useState, useEffect } from 'react'
import logoImg from "../../../assets/img/logo-no-background.png"
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles['header-container']}>
        <div className={styles["logo-container"]}>
          <img src={logoImg} alt="Banco Universitario" />
        </div>

        <div className={`${styles["nav-container"]} ${isMobileMenuOpen ? styles["mobile-open"] : ""}`}>
          <nav className={styles["main-nav"]}>
            <ul>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("services")
                  }}
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("nosotros")
                  }}
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contactos"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contactos")
                  }}
                >
                  Contactos
                </a>
              </li>
            </ul>
          </nav>

          <button className={styles["acceso-btn"]}>
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
            Acceso
          </button>
        </div>

        <button className={styles["mobile-menu-btn"]} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={styles["header-divider"]}></div>
    </header>
  )
}

export default Header