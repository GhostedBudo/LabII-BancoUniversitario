import React from 'react'
import styles from './Services.module.css'
import iconTransfer from '../../../assets/img/capTrans1.png'
import iconDep from '../../../assets/img/capDep1.png'
import iconConsMov from '../../../assets/img/capTransMov1.png'
import iconEduc from '../../../assets/img/capEduc1.png'
import iconCobBec from '../../../assets/img/capTarifa1.png'
import iconRet from '../../../assets/img/capRet1.png'

import cardTransfer from '../../../assets/img/cardTransfer.png'
import cardDep from '../../../assets/img/cardDep.png'
import cardConsMov from '../../../assets/img/cardConsMov.png'
import cardMatr from '../../../assets/img/cardMatr.png'
import cardCobBec from '../../../assets/img/cardCobBec.png'
import cardRet from '../../../assets/img/cardRet.png'


const Services = () => {
  return (
    <>
    <h1 className={styles.titServ}>Servicios</h1>

    <div className={styles.conteiner} >
       
      <div className={styles.imgServices1}> 
      
          <img src={cardTransfer} className={styles.contTransfer} alt="" />

          <img src={cardDep} className={styles.contDep}  alt="" />

          <img src={cardConsMov} className={styles.contConsMov} alt="" />
        
      </div>

      <div className={styles.imgServices2}>

        <img src={cardMatr} className={styles.contMatr} alt="" />
        
        <img src={cardCobBec} className={styles.contCobBec} alt="" />

        <img src={cardRet} className={styles.contRet} alt="" />
       
      </div>
    </div>
     
    </>
    
    
  )
}

export default Services