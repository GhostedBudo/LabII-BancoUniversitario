import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import styles from './Transfer.module.css';
import TitleAndClock from '../../../utils/components/TitleAndClock';
import AliasSearchModal from './AliasSearchModal';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import contactsIcon from "../../../assets/img/icons8-contacto-de-negocio.png";
import cancelarIcon from "../../../assets/img/icons8-cancelar.png";
import sendIcon from "../../../assets/img/icons8-enviar.png";

const Transfer = () => {
  const { getJwtToken } = useAuth();
  const navigate = useNavigate(); 
  const [fromAccount, setFromAccount] = useState('');
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState('');
  const [contactAlias, setContactAlias] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(''); // guardamos el string formateado
  const [concept, setConcept] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getJwtToken();
        const userResponse = await fetch('/api/v1/client/user/whoami', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const userJson = await userResponse.json();
        const text = userJson.data.account_number;
        const fromAccountFormatted = `Cuenta Ahorro ${text.slice(-4).padStart(text.length, "*")}`;
        setFromAccount(fromAccountFormatted);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = getJwtToken();
      const response = await fetch('/api/v1/client/contact', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        const contactsList = data.data.map(contact => ({
          alias: contact.alias,
          accountNumber: contact.account_number,
          contactId: contact.id
        }));
        setContacts(contactsList || []);
      } else {
        toast.error('Error fetching contacts');
      }
    }
    if (isModalOpen) {
      fetchContacts();
    }
  }, [isModalOpen]);

  const handleAmountChange = (value) => {
    setAmount(value || '');
  };

  const handleCancelTransfer = (e) => {
    setAmount('');
    setConcept('');
    setAccountNumber('');
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (!accountNumber || !amount || !concept) {
      toast.error('Por favor complete todos los campos.');
      return;
    }
    
    // parseamos el string formateado a número
    const numericAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('El monto debe ser mayor a cero.');
      return;
    }

    try {
      const response = await fetch('/api/v1/client/movement', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount,
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
        };
        
        navigate(`${data.data.id}`, {
          state: transferDetails
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error en la transferencia');
      }
    } catch (error) {
      console.error('Error during transfer:', error);
      toast.error('An error occurred while processing the transfer.');
    }
    
    setAccountNumber('');
    setAmount('');
    setConcept('');
  };

  const handleAliasSelect = (aliasAccountNumber, contactAlias) => {
    setAccountNumber(aliasAccountNumber);
    setContactAlias(contactAlias); 
    setContactId(contactId);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TitleAndClock title={"Ingresa los datos"}/>
      </header>
      
      <div className={styles.transferFormContainer}>
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
                className={`${styles.formInput}`}
              />
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Buscar alias"
              >
                <img src={contactsIcon} alt="contacts modal button" />
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount">Transferir (Bs.)</label>
            <CurrencyInput
              id="amount"
              name="amount"
              placeholder="0.00"
              decimalsLimit={2}
              decimalSeparator="."
              groupSeparator=","
              value={amount}
              onValueChange={handleAmountChange}
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
            <button 
              type="button" 
              className={`${styles.actionButton} ${styles.cancelButton}`} 
              onClick={handleCancelTransfer}
            >
              <img src={cancelarIcon} alt="Cancelar Transferencia" width={'30px'} />
              Cancelar
            </button>
            <button 
              type="submit" 
              className={`${styles.actionButton} ${styles.payButton}`}
            >
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
