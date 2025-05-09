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

  useEffect(() => {
    const token = getJwtToken();

  }, []);

  const login = useCallback((jwtToken) => {
    setJwtToken(jwtToken);
  }, []);

  const logout = useCallback(() => {
    setJwtToken("");
  }, []);

  const getToken = useCallback(() => getJwtToken())

  return { login, logout, getToken };
};

export default useAuth;