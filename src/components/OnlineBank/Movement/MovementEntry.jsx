import React from 'react';
import styles from './MovementEntry.module.css';
import { formatValue } from 'react-currency-input-field';

const MovementEntry = ({ entry }) => {
  const isHeader = typeof entry.amount !== 'number'; // esto es para detectar la primera fila de la tabla y formatearla debidamente, ya que as cabeceras de la tabla tambien son entradas a la tabla, y con esto colocamos la linea separadora

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
        {`${entry.amount.toLocaleString('es-VE')} Bs`}
      </div>
    </div>
  );
};

export default MovementEntry;
