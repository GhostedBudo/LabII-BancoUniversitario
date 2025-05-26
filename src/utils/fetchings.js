import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
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

        // Update state together
        return {
          user: userJson.data,
          balance: balanceJson.data
        }
        
      } catch (error) {
        toast.error('Error fetching data')
        // console.error("Error fetching data:", error);
      } 
}

export {
    fetchUser
}