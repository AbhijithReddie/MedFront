import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:5632/login", { ...data });
      if (response.data) {
        setToken(response.data.token);
        setRole(response.data.role);
        //setUser(response.data.user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        //localStorage.setItem("username",response.data.user.username);
        return;
      }
    } catch (err) {
      console.log(err);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, role, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
