import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useLocation, Link } from 'react-router-dom' // Removed useOutletContext, useAuth if not directly used in this component for other purposes
import styles from "./TransferReport.module.css";
import useAuth from '../../../hooks/useAuth';

// Versiones para error de transferencia, transferencia correcta, etc
const TransferReport = () => {
  const { getJwtToken } = useAuth();
  const { transferId } = useParams(); // Get transferId from URL params
  const { state: transferDetails } = useLocation(); // Destructure state and rename for clarity

  const [contactName, setContactName] = useState('');
  const [loadingContact, setLoadingContact] = useState(true); // New loading state for contact name

  useEffect(() => {
    const fetchingContact = async () => {
      // Only proceed if transferDetails and contactAccountNumber are available
      if (transferDetails?.contactAccountNumber) {
        setLoadingContact(true); // Start loading for contact name
        try {
          // Use transferDetails.contactAccountNumber safely
          const token = getJwtToken();
          const url = `/api/v1/client/user/account/${transferDetails.contactAccountNumber}`;
          const res = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const json = await res.json();
          if (res.ok && json.data) { // Check res.ok for HTTP success and json.data for content
            setContactName(`${json.data.first_name || ''} ${json.data.last_name || ''}`);
          } else {
            toast.error(json.message || 'Error fetching contact details.');
            setContactName('N/A'); // Set to N/A on fetch error
          }
        } catch (error) {
          console.error("Error fetching contact name:", error);
          toast.error('An unexpected error occurred while fetching contact name.');
          setContactName('N/A'); // Set to N/A on network error
        } finally {
          setLoadingContact(false); // Stop loading regardless of success or failure
        }
      } else {
        // If transferDetails or contactAccountNumber is not available, don't fetch
        setContactName('N/A'); // Indicate that no contact info is available
        setLoadingContact(false); // No loading needed if not fetching
      }
    };

    // This useEffect will run when `transferDetails` changes,
    // ensuring fetchingContact is called when state is passed during navigation.
    fetchingContact();

    // Show a general success/info toast based on transferDetails availability
    if (transferDetails) {
      toast.success("Transfer Report Loaded!");
    } else {
      toast('No complete transfer details available from navigation state. Displaying info from URL.', { icon: 'ℹ️' });
    }

  }, [transferDetails]); // Add transferDetails to the dependency array

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
        <span>Nro. Referencia: <span className={styles.label}>{transferDetails?.reference || transferId || 'N/A'}</span></span>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.toAccountContainer}>
          <p>A la cuenta</p>
          <span className={styles.label}> {transferDetails?.contactAccountNumber || "N/A"}</span>
          <span> <span className={styles.label}>Nombre: </span> {loadingContact ? "Cargando nombre..." : contactName}</span> {/* Display loading for contact name */}
          <span> <span className={styles.label} >Alias: </span>{ transferDetails?.alias || "N/A"}</span>
        </div>

        <div className={styles.conceptContainer}>
          <p>Descripción</p>
          <span>{transferDetails?.description || 'N/A'}</span>
        </div>

        <div className={styles.amountContainer}>
          <p>Monto (Bs.s)</p>
          <span className={styles.amountText}>{transferDetails?.amount?.toFixed(2) || '0.00'}</span> {/* Format amount */}
        </div>

        <div className={styles.timestampContainer}>
          <p>Fecha y Hora</p>
          <span>{transferDetails?.timestamp ? new Date(transferDetails.timestamp).toLocaleString() : 'N/A'}</span> {/* Format date */}
        </div>

        <div className={styles.fromAccountContainer}>
          <p>Desde mi Cuenta</p>
          <span>{transferDetails?.fromAccount || 'N/A'}</span>
        </div>
      </div>


      
    </div>
    <div className={styles.buttonGroup}>
                 <Link to={'/user'} style={ { textDecoration: 'none'}}>
                 <button type="button" className={`${styles.actionButton} ${styles.cancelButton}`}>
                    
                    Resumen Financiero
                  </button>
                 </Link> 

                 <Link to={"/user/transfer"} style={ { textDecoration: 'none'}}>
                  <button type="button" className={`${styles.actionButton} ${styles.payButton}`}>
                    Nueva Transferencia
                    
                  </button>
                 </Link>
    </div>

      </>
  )
}

export default TransferReport;