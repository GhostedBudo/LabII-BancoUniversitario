import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css";
import bankCard from "../../../assets/img/tarjetBancRecortada.png"
import Clock from '../../../utils/components/Clock';
import { useOutletContext } from 'react-router-dom';
import ToggleableText from '../../../utils/components/ToggleableText';
import toast from 'react-hot-toast';

const Movement = () => {
  const { getJwtToken } = useAuth();
  const { userData } = useOutletContext();
  const [movementsData, setMovementsData] = useState([]);
  const [accountNumber, setAccountNumber] = useState(userData?.user?.account_number || 0);
  const [accountBalance, setAccountBalance] = useState(userData?.balance?.balance || 0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [multiplier, setMultiplier] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchMovements = async () => {
      const baseURL = `/api/v1/client/movement?page=${currentPage}&page_size=${pageSize}${multiplier !== 0 ? `&multiplier=${multiplier}` : ''}`;
      const nextURL = `/api/v1/client/movement?page=${currentPage + 1}&page_size=${pageSize}${multiplier !== 0 ? `&multiplier=${multiplier}` : ''}`;

      try {
        const response = await fetch(baseURL, {
          headers: {
            'Authorization': `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
          }
        });
        const currentData = await response.json();
        const currentList = currentData.data || [];
        setMovementsData(currentList);

        const nextResponse = await fetch(nextURL, {
          headers: {
            'Authorization': `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
          }
        });
        const nextData = await nextResponse.json();
        const nextList = nextData.data || [];
        setHasNextPage(nextList.length > 0);

        if (currentList.length === 0 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }

      } catch (error) {
        toast.error('Error cargando movimientos');
        setMovementsData([]);
        setHasNextPage(false);
      }
    };

    fetchMovements();
  }, [pageSize, currentPage, multiplier]);

  const handlePrevPageChange = () => {
    setCurrentPage(prev => prev === 1 ? prev : prev - 1);
  };

  const handleNextPageChange = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleLeftRadio = (e) => {
    if (parseInt(e.target.value) === multiplier) {
      e.target.checked = false;
      setMultiplier(0);
    } else {
      setMultiplier(parseInt(e.target.value));
    }
    setCurrentPage(1);
  };

  const handleRightRadio = (e) => {
    if (parseInt(e.target.value) === multiplier) {
      e.target.checked = false;
      setMultiplier(0);
    } else {
      setMultiplier(parseInt(e.target.value));
    }
    setCurrentPage(1);
  };

  const movements = movementsData.map(m => {
    const entry = {
      date: new Date(m.created_at).toLocaleString('es-VE'),
      reference: m.id,
      description: m.description,
      amount: m.amount * m.multiplier,
    };

    return <MovementEntry key={m.id} entry={entry} />;
  });

  return (
    <>
      <div className={styles.accountContainer}>
        <div className={styles.titleBar}>
          <span>Detalle de la cuenta</span>
          <Clock />
        </div>

        <div className={styles.balanceContainer}>
          <div className={styles.balance}>
            <img src={bankCard} alt="tarjeta" />
            <div className={styles.textContainer}>
              <div>
                <span>Cuenta de Ahorro</span><br />
                <ToggleableText text={accountNumber} colorEye={'white'} />
              </div>
              <div className={styles.cardAmount}>
                <span>Disponible:</span><br />
                {!!accountBalance ? 'Bs. ' + accountBalance : 'Loading...'}
              </div>
            </div>
          </div>

          <div className={styles.account}>
            <div className={styles.accountText}>
              <span className={styles.consultaTuCuenta}>Consulta tu Cuenta</span>
              <input
                readOnly
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: 'solid #085f63 2px',
                  borderRadius: '0',
                  fontSize: '1rem',
                  fontFamily: 'Monserrat',
                }}
                type="text"
                placeholder={!!accountNumber ? 'Cuenta de Ahorro ' + accountNumber.slice(-4).padStart(accountNumber.length, '*') : 'Loading...'}
              />
            </div>
            <div className={styles.accountBtn}>
              <div className={styles.radioBtn}>
                <label htmlFor="">Credito</label>
                <input onClick={handleLeftRadio} value={1} type="radio" name="filter" />
                <label htmlFor="">Debito</label>
                <input onClick={handleRightRadio} value={-1} type="radio" name="filter" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.movementsContainer}>
        <select
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          value={pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>

        <MovementEntry entry={{
          date: "Fecha", reference: "Referencia", description: "Descripcion", amount: "Monto"
        }} />

        {movements}

        <div className={styles.pagesList}>
          {currentPage > 1 && <button onClick={handlePrevPageChange}>Prev</button>}
          <span style={{ padding: '0 1rem' }}>{currentPage}</span>
          {hasNextPage && <button onClick={handleNextPageChange}>Next</button>}
        </div>
      </div>
    </>
  );
};

export default Movement;
