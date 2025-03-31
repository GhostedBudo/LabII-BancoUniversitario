import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.sliderContainer}>

        <div className={styles.sliderTrack}>
          <img src="/src/assets/icon/iconUcla.png" alt="UCLA" />
          <img src="/src/assets/icon/icon200.png" alt="UCLA DCYT" />
          <img src="/src/assets/icon/iconUnexpo.png" alt="UNEXPO" />
          <img src="/src/assets/icon/iconUnellez.png" alt="UNELLEZ" />
          {/* Duplicamos imágenes para efecto de loop */}
          <img src="/src/assets/icon/iconUcla.png" alt="UCLA" />
          <img src="/src/assets/icon/icon200.png" alt="UCLA DCYT" />
          <img src="/src/assets/icon/iconUnexpo.png" alt="UNEXPO" />
          <img src="/src/assets/icon/iconUnellez.png" alt="UNELLEZ" />
        </div>
      </div>

      <div className={styles.contactInfo}>
        <p>Dirección: Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela.</p>
        <p>Teléfono: +58 212-555-5555</p>
        <p>Fax: +58 212-555-5556</p>
        <p>Correo: info@bancouniversitario.com.ve</p>
      </div>

      <div className={styles.socialIcons}>
        <a href="https://facebook.com">
          <img src="/src/assets/icon/iconFacebook.png" alt="Facebook" className={styles.icon} />
        </a>
        <a href="https://instagram.com">
          <img src="/src/assets/icon/iconInstagram.png" alt="Instagram" className={styles.icon} />
        </a>
        <a href="https://twitter.com">
          <img src="/src/assets/icon/iconX.png" alt="X" className={styles.icon} />
        </a>
      </div>

      <p className={styles.copyright}>
        &copy; Banco Universitario. Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;
