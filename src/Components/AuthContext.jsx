import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      console.log("From Login ACTION \n",data);
      const response = await axios.post("http://localhost:5632/login", { ...data });
      console.log("After the request \n",response.data);
      if (response.data) {
        setToken(response.data.token);
        setRole(response.data.role);
        setUser(response.data.user);
        setUserId(response.data.user._id); // Assuming the userId is stored in response.data.user._id

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("userId", response.data.user._id); // Store userId in local storage

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
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId"); // Remove userId from local storage
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, role, userId, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
