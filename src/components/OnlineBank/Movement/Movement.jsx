import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css";
import bankCard from "../../../assets/img/tarjetBancRecortada.png"
import Clock from '../../../utils/components/Clock';
import { useOutletContext } from 'react-router-dom';
import ToggleableText from '../../../utils/components/ToggleableText';

const Movement = () => {
    const { getJwtToken } = useAuth();
    const { userData } = useOutletContext();
    const [movementsData, setMovementsData] = useState([])
    const [accountNumber, setAccountNumber] = useState(userData?.user?.account_number || 0);
    const [accountBalance, setAccountBalance] = useState(userData?.balance?.balance || 0);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [multiplier, setMultiplier] = useState(0);

    useEffect(() => {



        const fetchmovementsData = async () => {

            const url = `/api/v1/client/movement?page=${currentPage}&page_size=${pageSize}${multiplier != 0 ? `&multiplier=${multiplier}` : ''}`

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
                    // setAccountNumber(json.data[0]?.account_number)

                } else {
                    console.error('Formato de datos inesperado:', json.data);
                    setMovementsData([]);
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchmovementsData();




    }, [pageSize, currentPage, multiplier])

    const handlePrevPageChange = () => {
        setCurrentPage(prev => prev == 1 ? prev : prev - 1)
    }

    const handleNextPageChange = () => {
        setCurrentPage(prev => prev == 100 ? prev : prev + 1)
    }

    const handleLeftRadio = (e) => {
        if (e.target.value == multiplier) {
            e.target.checked = false;
            setMultiplier(0);
        } else {

            setMultiplier(e.target.value);
        }
    }

    const handleRightRadio = (e) => {
        if (e.target.value == multiplier) {
            e.target.checked = false;
            setMultiplier(0);
        } else {

            setMultiplier(e.target.value);
        }

    }

    const movements = movementsData.map(m => {

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

                    <Clock />

                </div>
                <div className={styles.balanceContainer}>


                    {/* TARJETA */}
                    <div className={styles.balance}>

                        <img src={bankCard} alt="tarjeta" />

                        <div className={styles.textContainer}>
                            <div >
                                <span>Cuenta de Ahorro</span><br />

                                <ToggleableText text={accountNumber} colorEye={'white'} />


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
                                type="text" name="" id="" placeholder={!!accountNumber ? 'Cuenta de Ahorro ' + accountNumber.slice(-4).padStart(accountNumber.length, '*') : 'Loading...'} />
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

                    {currentPage == 1 ? '' : <button onClick={handlePrevPageChange}>prev</button>}

                    <span style={{ padding: '0 1rem' }}>{currentPage}</span>

                    {movements.length < pageSize ? '' : <button onClick={handleNextPageChange}>next</button>}


                </div>
            </div>
        </>
    )
}

export default Movement