import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [selectedCat, setSelectedCat] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post(
      'http://localhost:8800/api/auth/login',
      inputs,
      { withCredentials: true }
    );

    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(
      'http://localhost:8800/api/auth/logout',
      { test: 'test' },
      { withCredentials: true }
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setSelectedCat, selectedCat }}
    >
      {children}
    </AuthContext.Provider>
  );
};
