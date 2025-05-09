import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when hook loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Login function
  const login = useCallback((token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }, []);

  // Get current token
  const getToken = useCallback(() => {
    return localStorage.getItem('authToken');
  }, []);

  return {
    isAuthenticated,
    getToken,
    login,
    logout
  };
};

export default useAuth;