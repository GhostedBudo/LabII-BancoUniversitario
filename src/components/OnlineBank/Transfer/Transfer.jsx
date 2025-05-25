import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './Transfer.module.css';
import AliasSearchModal from './AliasSearchModal';
import toast from 'react-hot-toast';
import Clock from '../../../utils/components/Clock'


const Transfer = () => {
  const { userData } = useOutletContext(); // Get userData from BankLayout
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded for demonstration
  const fromAccount = userData?.balance?.accountNumber || 'Cuenta de Ahorro **** 2861'; 

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!accountNumber || !amount || !concept) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      toast.error('Amount must be greater than zero.');
      return;
    }

    console.log({
      fromAccount,
      toAccount: accountNumber,
      amount: parseFloat(amount),
      concept,
    });
    toast.success('Transfer initiated!');
    setAccountNumber('');
    setAmount('');
    setConcept('');
  };

  const handleAliasSelect = (aliasAccountNumber) => {
    setAccountNumber(aliasAccountNumber);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Transferencias</h1>
        <Clock />
      </header>
    <div className={styles.transferFormContainer}>
      <h2 className={styles.formTitle}>Ingresa los Datos</h2>

      <form onSubmit={handleTransfer}>
        <div className={styles.formGroup}>
          <label htmlFor="fromAccount">Desde mi cuenta</label>
          <input
            type="text"
            id="fromAccount"
            value={fromAccount}
            disabled
            className={styles.disabledInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="toAccount">A la cuenta</label>
          <div className={styles.inputWithButton}>
            <input
              type="text"
              id="toAccount"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Número de cuenta"
              className={styles.formInput}
            />
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Buscar alias"
            >
              {/* Minimal icon representation */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                <path d="M19.5 22.5a.75.75 0 0 0 .75-.75v-13.5a.75.75 0 0 0-.75-.75h-8.25a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h8.25ZM11.25 10.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM12 14.25h5.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1 0-1.5Zm-.75 4.5h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5ZM7.5 1.5A.75.75 0 0 0 6.75 2.25v13.5a.75.75 0 0 0 .75.75h-.75a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 5.25 3h.75A.75.75 0 0 0 7.5 1.5ZM3 5.25v10.5A3.75 3.75 0 0 0 6.75 19.5h10.5A3.75 3.75 0 0 0 21 15.75V5.25A3.75 3.75 0 0 0 17.25 1.5H6.75A3.75 3.75 0 0 0 3 5.25Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Transferir (Bs.)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Monto"
            min="0"
            step="0.01"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="concept">Concepto</label>
          <input
            type="text"
            id="concept"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Ingresa..."
            className={styles.formInput}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={`${styles.actionButton} ${styles.cancelButton}`}>
            Cancelar
          </button>
          <button type="submit" className={`${styles.actionButton} ${styles.payButton}`}>
            Pagar
          </button>
        </div>
      </form>

      {isModalOpen && (
        <AliasSearchModal
          onClose={() => setIsModalOpen(false)}
          onSelectAlias={handleAliasSelect}
        />
      )}
    </div>
    </div>
    
  );
};

export default Transfer;