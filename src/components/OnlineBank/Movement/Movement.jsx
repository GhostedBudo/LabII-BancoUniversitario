import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';

const Movement = () => {
    const {getToken} = useAuth(); 
    const [userData, setUserData] = useState([])
    useEffect(() => {
        const fetchUserData = async () => {
        
            try {
                const response = await fetch('/api/v1/client/movement?page=1&page_size=20', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
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


    const movements =  userData.map((m, i) => <div key={m.id}>{`${m.id} - ${m.amount}bs - ${m.created_at}`}</div>);

   
    return (
        <>
            {movements}
        </>
    )
}

export default Movement