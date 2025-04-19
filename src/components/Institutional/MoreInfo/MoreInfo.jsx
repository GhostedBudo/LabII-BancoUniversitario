import React from "react";
import styles from "./MoreInfo.module.css";

const MoreInfo = () => {
  return (
    <div id="moreinfo" className={styles.main}>
      <div className={styles.title}>
        <h1>Educacion Financiera</h1>
      </div>
      <div className={styles.infoBackground}>
        <div className={styles.firstText}>
          "Promoviendo la Educación Financiera Integral en Estudiantes
          Universitarios a través de Charlas, Talleres y Capacitaciones sobre
          Ahorro, Inversión y Uso Responsable del Crédito para Fomentar una
          Gestión Financiera Eficaz y Sostenible".
        </div>
        <div className={styles.secondText}>
          Comprometidos con tu crecimiento y bienestar financiero.
        </div>
        <div className={styles.thirdText}>
          Te invitamos a participar ¡Inscripciones Proximamente! Contáctanos por
          nuestras Redes Sociales y a través de +58 212-555-5555
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
