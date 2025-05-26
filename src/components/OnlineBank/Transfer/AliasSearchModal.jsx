import React, { useState } from 'react';
import styles from './AliasSearchModal.module.css';
import searchIcon from '../../../assets/img/icons8-búsqueda.png'

const AliasSearchModal = ({ onClose, onSelectAlias, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const aliases = data || [] ;

  const filteredAliases = aliases.filter(contact =>
    contact.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Lógica simple para cerrar el modal al hacer clic fuera del contenido
  const handleOverlayClick = (event) => {
    // Si el elemento donde se hizo clic (event.target) es EXACTAMENTE el overlay
    // significa que el clic no ocurrió en un hijo del modal (como el contenido del modal).
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.closeIcon}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Ingresa el alias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} aria-label="Buscar">
            Buscar
            <img src={searchIcon} alt=""  width={`30px`}/>
          </button>
        </div>
        <div className={styles.aliasList}>
          {filteredAliases.length > 0 ? (
            filteredAliases.map((contact) => (
              <div
                key={contact.accountNumber}
                className={styles.aliasItem}
                onClick={() => onSelectAlias(contact.accountNumber, contact.alias)}
              >
                {contact.alias}
                 <span className={styles.aliasAccountNumber}>
                  {contact.accountNumber}
                </span>
              </div>
      
            ))
          ) : (
            <div className={styles.noResults}>No aliases found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AliasSearchModal;