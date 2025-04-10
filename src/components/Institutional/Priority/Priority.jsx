import React from 'react'
import styles from './Priority.module.css'
import cardTarj from '../../../assets/img/ImagenTarj2.png'
import cardTarjBank from '../../../assets/img/ImagenTarj.png'
import cardUniv from '../../../assets/img/graduacion.jpg'
import cardUnivGrad from '../../../assets/img/cardUnivGrad.png'

const Priority = () => {
  return (
    <>
    <h1 className={styles.titNuestPr}>Nuestra prioridad: tu seguridad</h1>

    <div className={styles.conteiner}>
      <div className={styles.contPriority}>
        <img src={cardTarj} className={styles.cardTarj} alt="" />
        
        <div className={styles.contConf}>
          <h1 className={styles.titConf}>Confianza</h1>
          <p className={styles.textConf}>Tu aliado seguro para proteger tus finanzas mientras te enfocas en alcanzar tus sueños académicos.</p>
        </div>

        <div className={styles.contSeg}>
          <h1 className={styles.titSeg}>Seguridad</h1>
          <p className={styles.textSeg}>La protección de tus datos y la seguridad de tus activos son nuestra máxima prioridad.</p>
        </div>

        <img src={cardTarjBank} className={styles.cardTarjBank} alt="" />

      </div>

      <div className={styles.contPriorityPrinc}>
        
        <img src={cardUnivGrad} className={styles.cardUniv} alt="" />

      </div>

    </div>
     
    </>   
    
  )
}
















export default Priority