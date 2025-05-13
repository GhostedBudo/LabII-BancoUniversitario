import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
import HeaderOnlineBank from '../../OnlineBank/Header/HeaderOnlineBank';
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import NavbarOnlineBank from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank';
import useAuth from '../../../hooks/useAuth';
const BankLayout = ( ) => {
  const [userData, setUserData] = useState({});
  const { getJwtToken } = useAuth(); 
  const token = getJwtToken(); 

  useEffect(() => {
    const getUserData = async () => {
        const url = `/api/v1/client/user/whoami`
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        })

        const json = await response.json(); 
       
        setUserData(json.data)

       
    }

    getUserData();
  }, [])
  return (
    <>
    
    <div className={styles.mainContainer}>
    <HeaderOnlineBank />
      <div className={styles.layoutContainer}>
        
          <NavbarOnlineBank />
        
        <div className={styles.mainContent}>
         

          <Outlet userData={userData} />
        </div>

      </div>
    </div>
      <FooterBank />
    </>
  )
}

export default BankLayout