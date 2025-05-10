import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import MovementEntry from './MovementEntry';
import styles from "./Movement.module.css"
const Movement = () => {
    const {getJwtToken} = useAuth(); 
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
                Contenedor 1
                <div className={styles.balance}> Contenedor 1.1 </div>
                <div className={styles.account}> Contenedor 1.2 </div>
            </div>

            <div className={styles.movementsContainer}> 
                <MovementEntry entry={{
                    date: "Fecha", reference: "Referencia", description: "Descripcion", amount: "Monto"
                }} />
                {movements}
            </div>
        </>
    )
}

export default Movement