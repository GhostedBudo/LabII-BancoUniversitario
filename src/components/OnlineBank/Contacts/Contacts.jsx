import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import styles from './Contacts.module.css';
import Clock from '../../../utils/components/Clock';
import { useOutletContext, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import addUser from "../../../assets/img/icons8-agregar-usuario.png";
import editUser from "../../../assets/img/icons8-modificar.png";
import deleteUser from "../../../assets/img/icons8-eliminar.png";

const Contacts = () => {
  const { getJwtToken } = useAuth();
  const { userData } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`/api/v1/client/contact?page=${currentPage}&page_size=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
          }
        });
        const currentData = await response.json();
        const currentList = currentData.data || [];

        const nextResponse = await fetch(`/api/v1/client/contact?page=${currentPage + 1}&page_size=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
          }
        });
        const nextData = await nextResponse.json();
        const nextList = nextData.data || [];

        setContacts(currentList);
        setHasNextPage(nextList.length > 0);

        if (currentList.length === 0 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
      } catch (error) {
        toast.error('Error cargando contactos');
        setContacts([]);
        setHasNextPage(false);
      }
    };

    fetchContacts();
  }, [currentPage, pageSize]);

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev === 1 ? prev : prev - 1));
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const confirmDelete = (id) => {
    setContactToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);

    try {
      const response = await fetch(`/api/v1/client/contact/${contactToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Contacto eliminado correctamente');
        setContacts(prev => prev.filter(contact => contact.id !== contactToDelete));
      } else {
        const error = await response.json();
        toast.error(error?.message || 'Error eliminando el contacto');
      }
    } catch (error) {
      toast.error('Error en la conexión al eliminar el contacto');
    } finally {
      setContactToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setContactToDelete(null);
  };

  return (
    <div className={styles.ContactsContainer}>
      <div className={styles.titleBar}>
        <span>Lista de Contactos</span>
        <Clock />
      </div>

      <div className={styles.movementsContainer}>
        <select
          className={styles.select}
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>

        <div className={styles.contactHeader}>
          <span>Alias</span>
          <span>Cuenta</span>
          <span>Descripción</span>
          <span>Acciones</span>
        </div>

        {contacts.map((c) => (
          <div key={c.id} className={styles.contactRow}>
            <div>{c.alias}</div>
            <div>{c.account_number}</div>
            <div>{c.description}</div>
            <div className={styles.rowActions}>
              <button onClick={() => navigate('/user/contacts-list', { state: c })}>
                <img src={editUser} alt="Editar" className={styles.iconButton} />
                <span>Editar</span>
              </button>
              <button onClick={() => confirmDelete(c.id)}>
                <img src={deleteUser} alt="Borrar" className={styles.iconButton} />
                <span>Borrar</span>
              </button>
            </div>
          </div>
        ))}

        <div className={styles.pagesList}>
          {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
          <span style={{ padding: '0 1rem' }}>{currentPage}</span>
          {hasNextPage && <button onClick={handleNextPage}>Next</button>}
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button onClick={() => navigate('/user/contacts-list')}>
          <img src={addUser} alt="Agregar" className={styles.addIcon} />
          <span>Agregar Contacto</span>
        </button>
      </div>

      {showConfirm && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmBox}>
            <p>¿Estás seguro de que deseas eliminar este contacto?</p>
            <div className={styles.confirmButtons}>
              <button onClick={handleDeleteConfirmed} className={styles.confirmYes}>Sí</button>
              <button onClick={handleCancelDelete} className={styles.confirmNo}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
