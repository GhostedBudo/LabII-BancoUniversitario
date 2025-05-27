import { useEffect, useState } from 'react'
import Clock from '../../../utils/components/Clock';
import styles from './Overview.module.css'
import ToggleableText from '../../../utils/components/ToggleableText';
import useAuth from '../../../hooks/useAuth';



const Overview = () => {

  const [userData, setUserData] = useState({});
  const { getJwtToken } = useAuth();
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
        console.log(user)
        // Update state together
        setUserData(user)

      } catch (error) {
        toast.error(error.message)
        // console.error("Error fetching data:", error);
      }
    }

    fetchUser();

  }, [])


  return (
    <div className={styles.main}>
      <div className={styles.clock}><Clock /></div>
      <div className={styles.name}>
        <h1>
          {`¡Hola ${userData?.user?.first_name ?? 'Loading...'} ${userData?.user?.last_name ?? ''}!`}
        </h1>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>
          <span>Producto / Nro. de producto</span>
          <span>Disponible</span>

        </div>
        <div className={styles.content}>

          <ToggleableText colorEye={'gray'} text={userData?.user?.account_number ?? 'Loading...'} />

         <span>
  {userData?.balance?.balance != null
    ? `Bs. ${userData?.balance?.balance.toLocaleString('es-VE', { decimal: true})}`
    : 'Loading...'}
</span>

        </div>
      </div>
    </div>
  );
};

export default Overview