import React from 'react'
import styles from './Services.module.css'
import imgTransfer from '../../../assets/img/Serv1.png'
import imgDep from '../../../assets/img/Serv2.png'
import imgCons from '../../../assets/img/Serv3.png'
import imgPagoMat from '../../../assets/img/Serv4.png'
import imgCobro from '../../../assets/img/Serv5.png'
import imgRetiro from '../../../assets/img/Serv6.png'


const Services = () => {
  return (
    <>
    <h1 className={styles.titServ}>Servicios</h1>
    
    <div className={styles.imgServices1}> 
      <img src={imgTransfer} className={styles.imgBorder}  alt="" />
      <img src={imgDep} className={styles.imgBorder} alt="" />
      <img src={imgCons} className={styles.imgBorder} alt="" />
    </div>
    <div className={styles.imgServices2}>
      <img src={imgPagoMat} className={styles.imgBorder} alt="" />
      <img src={imgCobro} className={styles.imgBorder} alt="" />
      <img src={imgRetiro} className={styles.imgBorder} alt="" />
    </div>
    </>
    
    
  )
}

export default Services