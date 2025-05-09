import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const {getToken} = useAuth();

  return !!getToken ? children : <Navigate to="/signup" state={{ from: location }} replace />

}

export default PrivateRoute; 