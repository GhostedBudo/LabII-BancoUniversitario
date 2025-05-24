import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import styles from './Contacts.module.css';
import Clock from '../../../utils/components/Clock';
import toast from 'react-hot-toast';
import { useOutletContext, useNavigate } from 'react-router-dom';

const Contacts = () => {
  const { getJwtToken } = useAuth();
  const { userData } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const url = `/api/v1/client/contact?page=${currentPage}&page_size=${pageSize}`;
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

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`/api/v1/client/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Contacto eliminado correctamente');
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      } else {
        const error = await response.json();
        toast.error(error?.message || 'Error eliminando el contacto');
      }
    } catch (error) {
      toast.error('Error en la conexión al eliminar');
    }
  };

  return (
    <div className={styles.ContactsContainer}>
      <div className={styles.titleBar}>
        <span>Lista de Contactos</span>
        <Clock />
      </div>

      <div className={styles.movementsContainer}>
        <select className={styles.select} value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>

        {/* Cabecera */}
        <div className={styles.contactHeader}>
          <span>Alias</span>
          <span>Cuenta</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </div>

        {/* Contactos */}
        {contacts.map((c) => (
          <div key={c.id} className={styles.contactRow}>
            <div>{c.alias}</div>
            <div>{c.account_number}</div>
            <div>{c.description}</div>
            <div className={styles.rowActions}>
              <button onClick={() => navigate('/user/contacts-list', { state: c })}>Editar</button>
              <button onClick={() => handleDeleteContact(c.id)}>Borrar</button>
            </div>
          </div>
        ))}

        <div className={styles.pagesList}>
          {currentPage !== 1 && <button onClick={handlePrevPage}>Prev</button>}
          <span style={{ padding: '0 1rem' }}>{currentPage}</span>
          {contacts.length === pageSize && <button onClick={handleNextPage}>Next</button>}
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={() => navigate('/user/contacts-list')}>Agregar Contacto</button>
      </div>
    </div>
  );
};

export default Contacts;
