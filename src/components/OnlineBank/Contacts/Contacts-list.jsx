import React, { useState } from 'react';
import styles from './Contacts-list.module.css';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactsList = () => {
  const { getJwtToken } = useAuth();
  const navigate = useNavigate();

  const [alias, setAlias] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alias || !accountNumber) {
      toast.error('Alias y cuenta son obligatorios');
      return;
    }

    const jwt = getJwtToken();

    try {
      const response = await fetch('/api/v1/client/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: alias.trim(),
          account_number: accountNumber.trim(), 
          description: description.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
        throw new Error(errorData.message || 'No se pudo crear el contacto');
      }

      toast.success('Contacto creado exitosamente');
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.contactFormTitle}>Nuevo Contacto</h2>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label className={styles.contactFormLabel}>
          Alias:
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
            className={styles.contactFormInput}
          />
        </label>

        <label className={styles.contactFormLabel}>
          Número de Cuenta:
          <input
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            className={styles.contactFormInput}
          />
        </label>

        <label className={styles.contactFormLabel}>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={styles.contactFormTextarea}
          />
        </label>

        <div className={styles.contactFormButtons}>
          <button type="submit" className={styles.contactFormButton}>Guardar</button>
          <button type="button" className={styles.contactFormButton} onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ContactsList;
