import {  useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import styles from './Transfer.module.css';
import TitleAndClock from '../../../utils/components/TitleAndClock';
import AliasSearchModal from './AliasSearchModal';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import contactsIcon from "../../../assets/img/icons8-contacto-de-negocio.png"
import cancelarIcon from "../../../assets/img/icons8-cancelar.png"
import sendIcon from "../../../assets/img/icons8-enviar.png"

// DONE: report of transfer, with the tx id in the url 
const Transfer = () => {
  const { getJwtToken } = useAuth();
  const navigate = useNavigate(); 
  const [fromAccount, setFromAccount] = useState()
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('')
  const [contactAlias, setContactAlias] = useState('')
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
     const fetchUser = async () => {
      try {
        // Fetch user data
        const token = getJwtToken();
        const userResponse = await fetch('/api/v1/client/user/whoami', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const userJson = await userResponse.json();
        console.log(userJson)
        const text = userJson.data.account_number;
        const fromAccountFormatted = `Cuenta Ahorro ${text.slice(-4).padStart(text.length, "*")}`
        setFromAccount(fromAccountFormatted)


      } catch (error) {
        toast.error(error.message)

      }
    }

    fetchUser();
 
  }, [])

  useEffect(() => {
    const fetchContacts = async () => {
      const token = getJwtToken();

      const response = await fetch('/api/v1/client/contact', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }); // Replace with actual API
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        const contactsList = data.data.map(contact => ({
          alias: contact.alias,
          accountNumber: contact.account_number,
          contactId: contact.id
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

  const handleCancelTransfer = (e) => {
    setAmount(0);
    setDisplayAmount('')
    setConcept('')
    setAccountNumber('')
  }
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
        const transferDetails = {
            contactAccountNumber: data.data.account_number, 
            alias: contactAlias, 
            fromAccount: fromAccount, 
            description: data.data.description, 
            amount: data.data.amount, 
            timestamp: data.data.created_at,
            reference: data.data.id
          }

          console.log("Transfer Details before nav", transferDetails)
        // navigate to transfer details
        navigate(`${data.data.id}`, {
          state: transferDetails
        })
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

  const handleAliasSelect = (aliasAccountNumber, contactAlias) => {
    setAccountNumber(aliasAccountNumber);
    setContactAlias(contactAlias); 
    setContactId(contactId)
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <TitleAndClock title={"Ingresa los datos"}/>
       
      </header>
      <div className={styles.transferFormContainer}>
        {/* Formulario de react router para cargar la data a la siguiente pantalla */}
        <form method='post' onSubmit={handleTransfer}>
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
                <img src={contactsIcon} alt="contacts modal button" />

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
            <button type="button" className={`${styles.actionButton} ${styles.cancelButton}`} onClick={handleCancelTransfer}>
              <img src={cancelarIcon} alt="Cancelar Transferencia" width={'30px'} />
              Cancelar
            </button>
            <button type="submit" className={`${styles.actionButton} ${styles.payButton}`}>
              Pagar
              <img src={sendIcon} alt="Transferir dinero" width={'30px'} />
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