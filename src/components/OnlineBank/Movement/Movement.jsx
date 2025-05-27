import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css";
import bankCard from "../../../assets/img/tarjetBancRecortada.png"
import ToggleableText from '../../../utils/components/ToggleableText';
import toast from 'react-hot-toast';
import TitleAndClock from '../../../utils/components/TitleAndClock';
import { formatValue } from 'react-currency-input-field';



const Movement = () => {
  const { getJwtToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [movementsData, setMovementsData] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [multiplier, setMultiplier] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data
        const token = getJwtToken();
        const userResponse = await fetch('/api/v1/client/user/whoami', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const userJson = await userResponse.json();

        // Fetch balance data
        const balanceResponse = await fetch('/api/v1/client/user/balance', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const balanceJson = await balanceResponse.json();
        const user = {
          user: userJson.data,
          balance: balanceJson.data
        }
        // console.log(user);

        setUserData(user)



      } catch (error) {
        toast.error(error.message)

      }
    }

    fetchUser();
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
        toast.error(error.message || 'Error cargando movimientos');
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
      <div className={styles.mainMovement}>
        <div className={styles.accountContainer}>
          <TitleAndClock title={"Detalle de la cuenta"} />
          <div className={styles.balanceContainer}>


            {/* TARJETA */}
            <div className={styles.balance}>

              <img src={bankCard} alt="tarjeta" />

              <div className={styles.textContainer}>
                <div >
                  <span>Cuenta de Ahorro</span><br />

                  <ToggleableText text={userData?.user?.account_number} colorEye={'white'} />


                </div>
                <div className={styles.cardAmount}>
                  <span>Disponible:</span>{" "}
                  { `Bs. ${userData?.balance?.balance.toLocaleString('es-VE')}` || 'Loading...'}
                </div>



              </div>

            </div>

            <div className={styles.account}>
              <div className={styles.accountText}>
                <span className={styles.consultaTuCuenta}>Consulta tu Cuenta</span>

                <input
                  readOnly
                  style={
                    {
                      background: 'none', border: 'none', borderBottom: 'solid #085f63 2px', borderRadius: '0', fontSize: '1rem', fontFamily: 'Monserrat',
                    }
                  }
                  type="text" name="" id="" placeholder={!!userData?.user?.account_number ? 'Cuenta de Ahorro ' + userData?.user?.account_number.slice(-4).padStart(userData?.user?.account_number.length, '*') : 'Loading...'} />
              </div>
              <div className={styles.accountBtn}>
                <div className={styles.radioBtn}>

                  <label htmlFor="">Credito</label>
                  <input
                    onClick={handleLeftRadio}
                    value={1}
                    type="radio" name="filter" id="" />
                  <label htmlFor="">Debito</label>
                  <input
                    value={-1}
                    onClick={handleRightRadio} type="radio" name="filter" id="" />
                </div>


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
