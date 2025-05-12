import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const {isAuthenticated, isLoading} = useAuth();


  
  if (isLoading) return <div>Loading...</div>
  

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />

}

export default PrivateRoute; 