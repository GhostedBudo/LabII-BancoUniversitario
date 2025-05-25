import React, { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './Transfer.module.css';
import AliasSearchModal from './AliasSearchModal';
import toast from 'react-hot-toast';
import Clock from '../../../utils/components/Clock'
import useAuth from '../../../hooks/useAuth';

// TODO: report of transfer, with the tx id in the url
const Transfer = () => {
  const {getJwtToken} = useAuth();
  const { userData } = useOutletContext(); // Get userData from BankLayout
  const [contacts, setContacts] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded for demonstration
  const fromAccount = userData?.balance?.accountNumber || 'Cuenta de Ahorro **** 2861'; 

  useEffect(() => {
    const fetchContacts = async () => {
      const token = getJwtToken();

      const response = await fetch('/api/v1/client/contact',  {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      }); // Replace with actual API
      const data = await response.json();
      if (response.ok) {
       console.log(data);
       const contactsList = data.data.map(contact => ({
          name: contact.alias,
          accountNumber: contact.account_number,
       }))
       console.log(contactsList);
        setContacts(contactsList || []);
      } else {
        toast.error('Error fetching contacts');
      }
    }
    if (isModalOpen) {

      fetchContacts();
    }
  }, [isModalOpen])

const formatAmount = (value) => {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, '');

  // Remove leading zeros, but keep at least one zero
  digits = digits.replace(/^0+(?!$)/, '');

  // Pad with zeros if needed (to ensure at least 3 digits)
  while (digits.length < 3) digits = '0' + digits;

  // Split into integer and decimal parts
  const integerPart = digits.slice(0, -2);
  const decimalPart = digits.slice(-2);

  // Add thousands separators to integer part
  const integerWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${integerWithDots},${decimalPart}`;
};


const handleAmountChange = (e) => {
  const rawValue = e.target.value;
  // Remove all except digits
  let digits = rawValue.replace(/\D/g, '');
  if (digits === '') digits = '0';

  const formatted = formatAmount(digits);
  setDisplayAmount(formatted);
  setAmount(Number(digits) / 100); // Store as float for logic
};



    // Validate input fields
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!accountNumber || !amount || !concept) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      toast.error('Amount must be greater than zero.');
      return;
    }

// Make the transfer request
    try {
      const response = await fetch('/api/v1/client/movement', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getJwtToken()}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount,
                        account_number: accountNumber,
                        description: concept,
                    }),
                });
      
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Transfer successful!');
        console.log('Transfer data:', data);
      }
    } catch (error) {
      console.error('Error during transfer:', error);
      toast.error('An error occurred while processing the transfer.');
    }
    // Reset form fields
    setAccountNumber('');
    setAmount('');
    setConcept('');
    setDisplayAmount('');
  };

  const handleAliasSelect = (aliasAccountNumber) => {
    setAccountNumber(aliasAccountNumber);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Ingresa los datos</h1>
        <Clock />
      </header>
    <div className={styles.transferFormContainer}>
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

        <div className={`${styles.formGroup}`}>
          <label htmlFor="toAccount">A la cuenta</label>
          <div className={styles.inputWithButton}>
            <input
              type="text"
              id="toAccount"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Número de cuenta"
              className={`  ${styles.formInput}`}
            />
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Buscar alias"
            >
              {/* Minimal icon representation */}
              {/* TODO: use the icon from figma */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                <path d="M19.5 22.5a.75.75 0 0 0 .75-.75v-13.5a.75.75 0 0 0-.75-.75h-8.25a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h8.25ZM11.25 10.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75ZM12 14.25h5.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1 0-1.5Zm-.75 4.5h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5ZM7.5 1.5A.75.75 0 0 0 6.75 2.25v13.5a.75.75 0 0 0 .75.75h-.75a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 5.25 3h.75A.75.75 0 0 0 7.5 1.5ZM3 5.25v10.5A3.75 3.75 0 0 0 6.75 19.5h10.5A3.75 3.75 0 0 0 21 15.75V5.25A3.75 3.75 0 0 0 17.25 1.5H6.75A3.75 3.75 0 0 0 3 5.25Z" />
              </svg>
              
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Transferir (Bs.)</label>
          <input
            type="text"
            id="amount"
            value={displayAmount}
            onChange={handleAmountChange}
            placeholder="0,00"
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
          data={contacts}
        />
      )}
    </div>
    </div>
    
  );
};

export default Transfer;