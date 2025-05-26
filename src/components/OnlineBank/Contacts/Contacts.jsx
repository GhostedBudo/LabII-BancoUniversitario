import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import styles from './Contacts.module.css';
import Clock from '../../../utils/components/Clock';
import { useOutletContext, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import addUser from "../../../assets/img/icons8-agregar-usuario.png";
import editUser from "../../../assets/img/icons8-modificar.png";
import deleteUser from "../../../assets/img/icons8-eliminar.png";
import lupa from "../../../assets/img/icons8-búsqueda.png";

let debounceTimer;

const Contacts = () => {
  const { getJwtToken } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchContacts = async (searchTerm = search, page = currentPage, size = pageSize) => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('alias', searchTerm);
      queryParams.append('page', page);
      queryParams.append('page_size', size);

      const url = `/api/v1/client/contact?${queryParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setContacts(data.data || []);

      // Verificar si hay siguiente página
      const nextParams = new URLSearchParams();
      if (searchTerm) nextParams.append('alias', searchTerm);
      nextParams.append('page', page + 1);
      nextParams.append('page_size', size);

      const nextResponse = await fetch(`/api/v1/client/contact?${nextParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'Content-Type': 'application/json'
        }
      });
      const nextData = await nextResponse.json();
      setHasNextPage((nextData.data || []).length > 0);

    } catch (error) {
      toast.error('Error cargando contactos');
      setContacts([]);
      setHasNextPage(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, pageSize]);

  // Live search con debounce
  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchContacts(search, 1);
    }, 100);
    return () => clearTimeout(debounceTimer);
  }, [search]);

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
        setCurrentPage(1);
        fetchContacts(search, 1);
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

      <div className={styles.controlsRow}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por alias..."
          />
          <img src={lupa} alt="Buscar" />
        </div>

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
      </div>

      <div className={styles.movementsContainer}>
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
