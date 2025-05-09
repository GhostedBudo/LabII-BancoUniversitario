import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  //const isAuthenticated = !!localStorage.getItem('authToken') // Simple check
    const isAuthenticated = false;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default PrivateRoute; 