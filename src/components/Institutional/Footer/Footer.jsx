import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Contenedor del slider con degradado */}
      <div className={styles.sliderWrapper}>
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
      </div>

      {/* Imagen dentro de un recuadro blanco con bordes redondeados */}
      <div className={styles.imageContainer}>
        <img src="/src/assets/img/logo-no-background.png" alt="Logo Banco Universitario" />
      </div>

      {/* Sección de Contactos */}
      <div className={styles.contactSection}>
  <h2 className={styles.contactTitle}>Contactos</h2>
  <div className={styles.contactInfo}>
    <ul>
      <li>Dirección: Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela.</li>
      <li>Teléfono: +58 212-555-5555</li>
      <li>Fax: +58 212-555-5556</li>
      <li>Correo: info@bancouniversitario.com.ve</li>
    </ul>
  </div>
</div>


      {/* Redes sociales */}
      <div className={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank">
          <img src="/src/assets/icon/iconFacebook.png" alt="Facebook" className={styles.icon} />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src="/src/assets/icon/iconInstagram.png" alt="Instagram" className={styles.icon} />
        </a>
        <a href="https://twitter.com" target="_blank">
          <img src="/src/assets/icon/iconX.png" alt="X" className={styles.icon} />
        </a>
      </div>

      <p className={styles.socialnetuser}>
          @bancouniversitariove
      </p>

      <p className={styles.copyright}>
        &copy; Banco Universitario. Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;
