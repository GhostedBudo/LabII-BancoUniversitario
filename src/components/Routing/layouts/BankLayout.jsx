import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from '../layouts/BankLayout.module.css'
import HeaderOnlineBank from '../../OnlineBank/Header/HeaderOnlineBank';
import FooterBank from '../../OnlineBank/FooterBank/FooterBank';
import NavbarOnlineBank from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank';
import NavbarOnlineBank2 from '../../OnlineBank/Navbar Online Bank/navbarOnlineBank-alter';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
// const BankLayout = ( ) => {
//   const [userData, setUserData] = useState({
//     user: {}, balance: {}
//   });
//   const { getJwtToken } = useAuth(); 
//   const token = getJwtToken(); 
      

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const url = `/api/v1/client/user/balance`;


//       try {
//           const response = await fetch(url, {
//               headers: {
//                   'Authorization': `Bearer ${token}`,
//                   'Content-Type': 'application/json'
//               }
//           });
//           const json = await response.json();
//           userData.balance = json.data;


//       } catch (error) {
//           console.log(error)
//       }

//   }

//   const getUserData = async () => {
//     const url = `/api/v1/client/user/whoami`
//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`, 
//         'Content-Type': 'application/json'
//       }
//     })

//         const json = await response.json(); 
       
//         userData.user = json.data;
        
       
//     }

//     getUserData();
//     fetchBalance();
   
//   }, [])
//   return (
//     <>
    
//     <div className={styles.layout}>
//     <HeaderOnlineBank />
//       <div className={styles.main}>
        
//           <NavbarOnlineBank />
        
//         <div className={styles.content}>
         

//           <Outlet context={{userData}} />
//         </div>

//       </div>
//       <FooterBank />
//     </div>
//     </>
//   )
// }



const BankLayout = () => {
  const [userData, setUserData] = useState(null); // Start with null
  const [isLoading, setIsLoading] = useState(true);
  const { getJwtToken } = useAuth();
  const token = getJwtToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
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

        // Update state together
        setUserData({
          user: userJson.data,
          balance: balanceJson.data
        });
        
      } catch (error) {
        toast.error('Error fetching data')
        // console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <HeaderOnlineBank />
      <div className={styles.main}>
        <NavbarOnlineBank />
        <div className={styles.content}>
          <Outlet context={{ userData }} />
        </div>
      </div>
      <FooterBank />
    </div>
  );
};

export default BankLayout; 