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
                setUserData(data)
                console.log(userData)
            } catch (error) {
                console.log(error)
            }
        };
        fetchUserData(); 
    }, [])


  

   
    return (
        <div></div>
    )
}

export default Movement