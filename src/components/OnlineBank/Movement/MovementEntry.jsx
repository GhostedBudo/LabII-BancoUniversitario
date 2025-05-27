import React from 'react';
import styles from './MovementEntry.module.css';
import { formatValue } from 'react-currency-input-field';

const MovementEntry = ({ entry }) => {
  const isHeader = typeof entry.amount !== 'number';

  const amountStyle = !isHeader
    ? entry.amount >= 0
      ? styles.amountPositive
      : styles.amountNegative
    : '';

  return (
    <div className={`${styles.flex} ${isHeader ? styles.headerRow : styles.movementRow}`}>
      <div>{entry.date}</div>
      <div>{entry.reference}</div>
      <div>{entry.description}</div>
      <div className={amountStyle}>
        {`${entry.amount.toLocaleString('ve-ES')} Bs`}
      </div>
    </div>
  );
};

export default MovementEntry;
