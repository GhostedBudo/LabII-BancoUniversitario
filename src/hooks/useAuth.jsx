// useAuth.js
import { useState, useEffect, useCallback } from 'react';

// Helpers para sessionStorage 
export function getJwtToken() {
  return sessionStorage.getItem("jwt")
}

export function setJwtToken(token) {
  sessionStorage.setItem("jwt", token)
}

const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = getJwtToken();
    setIsAuthenticated(!!token)
    setIsLoading(false);
  }, []);

  const login = (jwtToken) => {
    setJwtToken(jwtToken);
    setIsAuthenticated(true);
    
  };

  const logout = () => {
    setJwtToken("");
    setIsAuthenticated(false);
  };


  return { isAuthenticated, isLoading, login, logout, getJwtToken };
};

export default useAuth;