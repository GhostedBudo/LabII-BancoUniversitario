import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Clock from '../../../utils/components/Clock';
import styles from './Overview.module.css'
import ToggleableText from '../../../utils/components/ToggleableText';

const Overview = () => {
  const { userData } = useOutletContext();

  // Safely access nested properties
  const user = userData?.user || {};
  const balance = userData?.balance || {};

  return (
    <div className={styles.main}>
      <div className={styles.clock}><Clock /></div>
      <div className={styles.name}>
        <h1>
          {`¡Hola ${user?.first_name ?? 'Loading...'} ${user?.last_name ?? ''}!`}
        </h1>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>
          <span>Producto / Nro. de producto</span>
          <span>Disponible</span>
          
        </div>
        <div className={styles.content}>

          <ToggleableText colorEye={'gray'} text={user?.account_number ?? 'Loading...'}/>
          
          {/* <span>{`Cuenta de Ahorro ${user?.account_number ?? 'Loading...'}`}</span> */}
          <span>{`Bs. ${balance?.balance ?? 'Loading...'}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Overview