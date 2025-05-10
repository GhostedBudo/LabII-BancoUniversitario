import React from 'react'
import styles from './MovementEntry.module.css'
const MovementEntry = ({entry}) => {
  return (
    <div className={styles.flex}>
        <div> {entry.date} </div>
        <div> {entry.reference} </div>
        <div> {entry.description} </div>
        <div> {entry.amount}</div>
    </div>
  )
}

export default MovementEntry