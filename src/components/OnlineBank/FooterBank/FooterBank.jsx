import React from 'react';
import styles from './FooterBank.module.css';

const FooterBank = ({ height = '60px' }) => {
  return (
    <footer className={styles.footer} style={{ '--footer-height': height }}>
      <p className={styles.text}>© 2025 Banco Universitario. RIF: J-00002986-1</p>
    </footer>
  );
};

export default FooterBank;