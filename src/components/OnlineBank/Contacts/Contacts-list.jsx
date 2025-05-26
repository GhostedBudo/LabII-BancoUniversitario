import React, { useEffect, useState } from 'react';
import styles from './Contacts-list.module.css';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactsList = () => {
  const { getJwtToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const contactToEdit = location.state || null;

  const [alias, setAlias] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      setAlias(contactToEdit.alias || '');
      setAccountNumber(contactToEdit.account_number || '');
      setDescription(contactToEdit.description || '');
    }
  }, [contactToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alias || !accountNumber) {
      toast.error('Alias y cuenta son obligatorios');
      return;
    }

    if (accountNumber.length !== 20) {
      toast.error('El número de cuenta debe tener exactamente 20 dígitos');
      return;
    }

    const jwt = getJwtToken();
    const isEditing = Boolean(contactToEdit?.id);

    try {
      setLoading(true);
      const url = isEditing
        ? `/api/v1/client/contact/${contactToEdit.id}`
        : '/api/v1/client/contact';

      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: alias.trim(),
          account_number: accountNumber.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo guardar el contacto');
      }

      toast.success(isEditing ? 'Contacto actualizado' : 'Contacto creado');
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setAccountNumber(value);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2 className={styles.contactFormTitle}>
        {contactToEdit ? 'Editar Contacto' : 'Nuevo Contacto'}
      </h2>

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
            onChange={handleAccountChange}
            required
            className={styles.contactFormInput}
            maxLength={20} // Este atributo no se respeta en inputs type="number", pero es útil si cambias a "text"
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
          <button type="submit" className={styles.contactFormButton} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" className={styles.contactFormButton} onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactsList;
