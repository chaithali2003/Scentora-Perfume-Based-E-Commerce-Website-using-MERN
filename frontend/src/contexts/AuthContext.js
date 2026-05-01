import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('perfume_token');
    const savedUser = localStorage.getItem('perfume_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token: accessToken, user: userData } = response.data;
    localStorage.setItem('perfume_token', accessToken);
    localStorage.setItem('perfume_user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
    return userData;
  };

  const signup = async (name, email, password, role) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password, role });
    const { token: accessToken, user: userData } = response.data;
    localStorage.setItem('perfume_token', accessToken);
    localStorage.setItem('perfume_user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('perfume_token');
    localStorage.removeItem('perfume_user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async ({ name, email, profileImage, password }) => {
    const response = await axios.put(`${API_URL}/auth/me`, { name, email, profileImage, password }, { headers: { Authorization: `Bearer ${token}` } });
    const userData = response.data.user;
    localStorage.setItem('perfume_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const authFetch = (options = {}) => {
    const headers = options.headers || {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return axios({ ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, updateProfile, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
