import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css"
const Movement = () => {
    const { getJwtToken } = useAuth();
    const [userData, setUserData] = useState([])
    
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
                console.log(error)
            }
        };
        fetchUserData();
    }, [])
    
    
    const movements = userData.map(m => {

        const entry = {
            date: m.created_at,
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
                    <div>09/06/2025 - 7:00pm</div>
                </div>
                <div className={styles.balanceContainer}>
                    <div className={styles.balance}>
                        <div className={styles.cardAccountNumber}>
                            <span>Cuenta de Ahorro</span><br/>
                            
                            <span>{!!userData ? userData[0]?.account_number : 'Loading...' }</span>
                        </div>
                        <div className={styles.cardAmount}>{!!userData ? userData[0]?.balance + 'bs' : 'Loading...' }</div>
                    </div>
                    <div className={styles.account}> 
                        <div className={styles.accountText}>
                            <span>Cuenta</span>
                    
                            <input type="text" name="" id="" placeholder={!!userData ? userData[0]?.account_number : 'Loading...'}/>
                        </div>
                        <div className={styles.accountBtn}>
                            <div className={styles.radioBtn}>

                            <label htmlFor="">Credito</label>
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Debito</label>
                            <input type="radio" name="" id="" />
                            </div>
                    
                            <button>Buscar</button>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className={styles.movementsContainer}>
                <MovementEntry entry={{
                    date: "Fecha", reference: "Referencia", description: "Descripcion", amount: "Monto"
                }} />
                <hr />
                {movements}
            </div>
        </>
    )
}

export default Movement