import React from 'react'
import styles from './Services.module.css'
import imgTransfer from '../../../assets/img/Serv1.png'
import imgDep from '../../../assets/img/Serv2.png'
import imgCons from '../../../assets/img/Serv3.png'
import imgPagoMat from '../../../assets/img/Serv4.png'
import imgCobro from '../../../assets/img/Serv5.png'
import imgRetiro from '../../../assets/img/Serv6.png'
import iconTransfer from '../../../assets/img/capTrans1.png'
import iconDep from '../../../assets/img/capDep1.png'
import iconConsMov from '../../../assets/img/capTransMov1.png'
import iconEduc from '../../../assets/img/capEduc1.png'
import iconCobBec from '../../../assets/img/capTarifa1.png'
import iconRet from '../../../assets/img/capRet1.png'


const Services = () => {
  return (
    <>
    <h1 className={styles.titServ}>Servicios</h1>

    <div className={styles.conteiner} >
       
      <div className={styles.imgServices1}> 
         <div className={styles.contTransfer}>
          <h1 className={styles.titTransfer}>Transferencias sin comisiones entre Estudiantes</h1>
          <img src={iconTransfer} className={styles.iTransfer} alt="" />
        </div>

        <div className={styles.contDep}>
          <h1 className={styles.titDep}>Depositos en Efectivo</h1>
          <img src={iconDep} className={styles.iDep} alt="" />
        </div>

        <div className={styles.contConsMov}>
          <h1 className={styles.titConsMov}>Consultas de Movimientos</h1>
          <img src={iconConsMov} className={styles.iConsMov} alt="" />
        </div>
      </div>

      <div className={styles.imgServices2}>
        <div className={styles.contEduc}>
          <img src={iconEduc} className={styles.iEduc} alt="" />
          <h1 className={styles.titEduc}>Pago de Matricula</h1>
        </div>

        <div className={styles.contCobBec}>
          <img src={iconCobBec} className={styles.iCobBec} alt="" />
          <h1 className={styles.titCobBec}>Cobro de Beca Estudiantil</h1>
        </div>

        <div className={styles.contRet}>
          <img src={iconRet} className={styles.iRet} alt="" />
          <h1 className={styles.titRet}>Retiro en Efectivo</h1>
        </div>
      </div>
    </div>
     
    </>
    
    
  )
}

export default Services