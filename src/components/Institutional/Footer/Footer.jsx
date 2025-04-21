import React from "react";
import styles from "./Footer.module.css";
import ucla from "../../../assets/img/iconUcla.png";
import ucladcyt from "../../../assets/img/icon200.png";
import unexpo from "../../../assets/img/iconUnexpo.png";
import unellez from "../../../assets/img/iconUnellez.png";
import logoBancoUniversitario from "../../../assets/img/logo-no-background.png";
import facebook from "../../../assets/img/iconFacebook.png";
import instagram from "../../../assets/img/iconInstagram.png";
import x from "../../../assets/img/iconX.png";

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      {/* Contenedor del slider con degradado */}
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            <img src={ucla} alt="UCLA" />
            <img src={ucladcyt}alt="UCLA DCYT" />
            <img src={unexpo} alt="UNEXPO" />
            <img src={unellez} alt="UNELLEZ" />
            {/* Duplicamos imágenes para efecto de loop */}
            <img src={ucla} alt="UCLA" />
            <img src={ucladcyt}alt="UCLA DCYT" />
            <img src={unexpo} alt="UNEXPO" />
            <img src={unellez} alt="UNELLEZ" />
            {/* Clonamos otra vez las imágenes para efecto de loop */}
            <img src={ucla} alt="UCLA" />
            <img src={ucladcyt}alt="UCLA DCYT" />
            <img src={unexpo} alt="UNEXPO" />
            <img src={unellez} alt="UNELLEZ" />

            <img src={ucla} alt="UCLA" />
            <img src={ucladcyt}alt="UCLA DCYT" />
            <img src={unexpo} alt="UNEXPO" />
            <img src={unellez} alt="UNELLEZ" />
          </div>
        </div>
      </div>

      {/* Imagen dentro de un recuadro blanco con bordes redondeados */}
      <div className={styles.imageContainer}>
        <img src={logoBancoUniversitario} alt="Logo Banco Universitario" />
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
          <img src={facebook} alt="Facebook" className={styles.icon} />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src={instagram} alt="Instagram" className={styles.icon} />
        </a>
        <a href="https://twitter.com" target="_blank">
          <img src={x} alt="X" className={styles.icon} />
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
