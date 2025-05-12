import React from 'react';
import styles from './MovementEntry.module.css';

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
        {isHeader ? entry.amount : `${entry.amount} Bs`}
      </div>
    </div>
  );
};

export default MovementEntry;
