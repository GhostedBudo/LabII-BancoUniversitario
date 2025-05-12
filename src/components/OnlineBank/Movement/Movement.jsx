import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css";
import tarjetabanco from '../../../assets/img/tarjetBanci.png';

const Movement = () => {
    const { getJwtToken } = useAuth();
    const [userData, setUserData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/v1/client/movement?page=1&page_size=20', {
                    headers: {
                        'Authorization': `Bearer ${getJwtToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                const json = await response.json();
                if (json.data && Array.isArray(json.data)) {
                    setUserData(json.data);
                } else {
                    console.error('Formato de datos inesperado:', json.data);
                    setUserData([]);
                }
            } catch (error) {
                console.log(error);
                // Datos de prueba por si falla el API
                setUserData([
                    {
                        id: '0001',
                        created_at: '2024-05-01',
                        description: 'Transferencia crédito',
                        amount: 500,
                        multiplier: 1,
                        account_number: '1234-5678-90',
                        balance: 1200
                    },
                    {
                        id: '0002',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0003',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0004',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0005',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0006',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0007',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0008',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0009',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0010',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    },
                    {
                        id: '0011',
                        created_at: '2024-05-02',
                        description: 'Pago de servicio',
                        amount: 200,
                        multiplier: -1,
                        account_number: '1234-5678-90',
                        balance: 1000
                    }
                    
                ]);
            }
        };

        fetchUserData();
    }, []);

    const movements = userData.slice(0, visibleCount).map(m => {
        const entry = {
            date: m.created_at,
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
                    <div><span>Detalle de la cuenta</span></div>
                    <div>
                        {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                </div>

                <div className={styles.balanceContainer}>
                    <div className={styles.balance}>
                        <img src={tarjetabanco} alt="Tarjeta bancaria" />
                        <div className={styles.cardAccountNumber}>
                            <span>Cuenta de Ahorro</span><br />
                            <span>{userData[0]?.account_number || 'Cargando...'}</span>
                        </div>
                        <div className={styles.cardAmount}>
                            {userData[0]?.balance ? `${userData[0]?.balance} Bs` : 'Cargando...'}
                        </div>
                    </div>

                    <div className={styles.account}>
                        <div className={styles.accountText}>
                            <span>Cuenta</span>
                            <input
                                type="text"
                                placeholder={userData[0]?.account_number || 'Cargando...'}
                            />
                        </div>
                        <div className={styles.accountBtn}>
                            <div className={styles.radioBtn}>
                                <label>Crédito</label>
                                <input type="radio" name="type" />
                                <label>Débito</label>
                                <input type="radio" name="type" />
                            </div>
                            <button>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control de cantidad a mostrar */}
            <div className={styles.selectContainer}>
                <label htmlFor="visibleCount">Mostrar: </label>
                <select
                    id="visibleCount"
                    value={visibleCount}
                    onChange={(e) => setVisibleCount(parseInt(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
            </div>

            <div className={styles.movementsContainer}>
                <MovementEntry entry={{
                    date: "Fecha", reference: "Referencia", description: "Descripción", amount: "Monto"
                }} />
                {movements}
            </div>
        </>
    );
};

export default Movement;