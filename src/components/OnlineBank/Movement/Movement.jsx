import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css";
import bankCard from "../../../assets/img/tarjetBancRecortada.png"

const Movement = ({ userData }) => {
    const { getJwtToken } = useAuth();
    const [movementsData, setMovementsData] = useState([])
    const [accountNumber, setAccountNumber] = useState("")
    const [accountBalance, setAccountBalance] = useState(0)
    const [accountNumberVisibility, setAccountNumberVisibility] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1)
    const [multiplier, setMultiplier] = useState(0)



    const visibleEye = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  


    const nonVisibleEye = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
  


    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {


        const fetchBalance = async () => {
            const url = `/api/v1/client/user/balance`;


            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${getJwtToken()}`,
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                setAccountBalance(json.data.balance);


            } catch (error) {
                console.log(error)
            }

        }
        const fetchmovementsData = async () => {

            const url = `/api/v1/client/movement?page=${currentPage}&page_size=${pageSize}${multiplier != 0 ? `&multiplier=${multiplier}`: ''}`

            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${getJwtToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                const json = await response.json();
                if (json.data && Array.isArray(json.data)) {
                    setMovementsData(json.data);
                    setAccountNumber(json.data[0]?.account_number)

                } else {
                    console.error('Formato de datos inesperado:', json.data);
                    setMovementsData([]);
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchmovementsData();
        fetchBalance();

  
   
    }, [pageSize, currentPage, multiplier])


    const toggleAccountNumber = () => setAccountNumberVisibility(prev => !prev);

    const handlePrevPageChange = () => {
        setCurrentPage(prev => prev == 1 ? prev : prev - 1)
    }

    const handleNextPageChange = () => {
        setCurrentPage(prev => prev == 100 ? prev : prev + 1)
    }

    const handleLeftRadio = (e) => {
        if (e.target.value == multiplier)  {
            e.target.checked = false; 
            setMultiplier(0); 
        } else {

            setMultiplier(e.target.value); 
        }
    }

    const handleRightRadio = (e) => {
        if (e.target.value == multiplier)  {
            e.target.checked = false; 
            setMultiplier(0); 
        } else {

            setMultiplier(e.target.value); 
        }

    } 
       



    const movements = movementsData.map((m, i) => {

        const entry = {

            date: new Date(m.created_at).toLocaleString('es-VE'),
            reference: m.id,
            description: m.description,
            amount: m.amount * m.multiplier,
        }

        return <MovementEntry key={m.id} entry={entry} />

    });




    return (
        <>
            <div className={styles.accountContainer}>
                <div className={styles.titleBar}>
                    <div><span>Detalle de la cuenta</span></div>
                    <div>
                        {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                </div>
                <div className={styles.balanceContainer}>


                    {/* TARJETA */}
                    <div className={styles.balance}>

                        <img src={bankCard} alt="tarjeta" />

                        <div className={styles.textContainer}>
                            <div >
                                <span>Cuenta de Ahorro</span><br />

                                <div className={styles.cardAccountNumber}>

                                    <span>{!!accountNumber ?
                                        accountNumberVisibility ? accountNumber : accountNumber.slice(-4).padStart(accountNumber.length, "*")
                                        : 'Loading...'}
                                    </span>


                                    <button onClick={toggleAccountNumber} className={styles.eye}>
                                        {accountNumberVisibility ? visibleEye : nonVisibleEye}
                                    </button>
                                </div>


                            </div>
                            <div className={styles.cardAmount}><span>Disponible:</span> <br />{!!accountBalance ? 'Bs. ' + accountBalance : 'Loading...'}</div>

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
                            type="text" name="" id="" placeholder={!!accountNumber ?'Cuenta de Ahorro ' + accountNumber.slice(-4).padStart(accountNumber.length, '*') : 'Loading...'} />
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

                            <button
                            style={{
                                backgroundColor: '#49beb7', border: 'none', borderRadius: '20px', fontFamily: 'Monserrat', fontSize: '1rem'
                            }}
                            >Buscar</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.movementsContainer}>
                <select
                    onChange={(e) => setPageSize(parseInt(e.target.value))}
                    value={pageSize}
                    name="page_size"
                    id="">
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
                    <button onClick={handlePrevPageChange}>prev</button>
                    <span style={{ padding: '0 1rem'}}>{currentPage}</span>
                    <button onClick={handleNextPageChange}>next</button>

                </div>
            </div>
        </>
    )
}

export default Movement