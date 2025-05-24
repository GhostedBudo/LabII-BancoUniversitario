import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import styles from './Contacts.module.css';
import Clock from '../../../utils/components/Clock';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';

const Contacts = () => {
  const { getJwtToken } = useAuth();
  const { userData } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const url = `/v1/client/contact?page=1&page_size=20`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
          }
        });

        const json = await response.json();
        if (json.data && Array.isArray(json.data)) {
          setContacts(json.data);
        } else {
          toast.error('Formato de datos inesperado');
          setContacts([]);
        }
      } catch (error) {
        toast.error('Error cargando contactos');
        setContacts([]);
      }
    };

    fetchContacts();
  }, [currentPage, pageSize]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (contacts.length < pageSize ? prev : prev + 1));
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.titleBar}>
        <span>Lista de Contactos</span>
        <Clock />
      </div>

      {/* Botones de acción global */}
      <div className={styles.actionButtons}>
        <button onClick={() => console.log('Agregar')}>Agregar</button>
        <button onClick={() => console.log('Editar global')}>Editar</button>
        <button onClick={() => console.log('Borrar global')}>Borrar</button>
      </div>

      <div className={styles.movementsContainer}>
        <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>

        {/* Cabecera */}
        <div className={`${styles.contactEntry} ${styles.headerRow}`}>
          <span>Alias</span>
          <span>Cuenta</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </div>

        {/* Contactos */}
        {contacts.map((c) => (
          <div key={c.id} className={styles.contactEntry}>
            <span>{c.alias}</span>
            <span>{c.account_number}</span>
            <span>{c.description}</span>
            <div className={styles.rowActions}>
              <button onClick={() => console.log('Editar', c.id)}>Editar</button>
              <button onClick={() => console.log('Borrar', c.id)}>Borrar</button>
            </div>
          </div>
        ))}

        <div className={styles.pagesList}>
          {currentPage !== 1 && <button onClick={handlePrevPage}>Prev</button>}
          <span style={{ padding: '0 1rem' }}>{currentPage}</span>
          {contacts.length === pageSize && <button onClick={handleNextPage}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
