import React, { useState } from 'react';
import styles from './AliasSearchModal.module.css';

const AliasSearchModal = ({ onClose, onSelectAlias }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const aliases = [
    { name: 'Jorge Chiquin', accountNumber: '1234567890' },
    { name: 'Alondra León', accountNumber: '0987654321' },
    { name: 'Hanuman Sánchez', accountNumber: '1122334455' },
    { name: 'Maria Garcia', accountNumber: '5566778899' },
    { name: 'Pedro Martinez', accountNumber: '9988776655' },
  ];

  const filteredAliases = aliases.filter(alias =>
    alias.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.modalOverlay}>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.searchIcon}>
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            Buscar
          </button>
        </div>
        <div className={styles.aliasList}>
          {filteredAliases.length > 0 ? (
            filteredAliases.map((alias) => (
              <div
                key={alias.accountNumber}
                className={styles.aliasItem}
                onClick={() => onSelectAlias(alias.accountNumber)}
              >
                {alias.name}
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