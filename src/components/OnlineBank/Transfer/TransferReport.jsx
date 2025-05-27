import { useLocation, Link } from 'react-router-dom'
import styles from "./TransferReport.module.css";



const TransferReport = () => {
  const { state: transferDetails } = useLocation();

  console.log(transferDetails?.amount)

  return (
    <>

      <div className={styles.mainContainer}>
        <header className={styles.titleContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <h1>Transferencia Exitosa</h1>
        </header>
        <div className={styles.referenceContainer}>
          <span>Nro. Referencia: <span className={styles.label}>{transferDetails?.reference || 'Loading...'}</span></span>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.toAccountContainer}>
            <p>A la cuenta</p>
            <span className={styles.label}> {transferDetails?.contactAccountNumber || "Loading..."}</span>
            <span> <span className={styles.label} >Alias: </span>{transferDetails?.alias || "Loading..."}</span>
          </div>

          <div className={styles.conceptContainer}>
            <p>Descripción</p>
            <span>{transferDetails?.description || 'Loading...'}</span>
          </div>

          <div className={styles.amountContainer}>
            <p>Monto (Bs.s)</p>
            <span className={styles.amountText}>{transferDetails?.amount?.toLocaleString('es-VE') || '0.00'}</span>
          </div>

          <div className={styles.timestampContainer}>
            <p>Fecha y Hora</p>
            <span>{transferDetails?.timestamp ? new Date(transferDetails.timestamp).toLocaleString() : 'Loading...'}</span>
          </div>

          <div className={styles.fromAccountContainer}>
            <p>Desde mi Cuenta</p>
            <span>{transferDetails?.fromAccount || 'Loading...'}</span>
          </div>
        </div>



      </div>
      <div className={styles.buttonGroup}>
        <Link to={'/user'} style={{ textDecoration: 'none' }}>
          <button type="button" className={`${styles.actionButton} ${styles.cancelButton}`}>

            Resumen Financiero
          </button>
        </Link>

        <Link to={"/user/transfer"} style={{ textDecoration: 'none' }}>
          <button type="button" className={`${styles.actionButton} ${styles.payButton}`}>
            Nueva Transferencia

          </button>
        </Link>
      </div>

    </>
  )
}

export default TransferReport;