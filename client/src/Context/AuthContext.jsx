import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

  // Parameterized signup function
  const signup = async (signupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Signup failed');
      }
      const data = await response.json();
      setUser(data.user || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Parameterized login function
  const login = async (loginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Login failed');
      }
      const data = await response.json();
      setUser(data.user || data);
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        setIsLoggedIn(true);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // window.location.reload();
  };

  // Check if user is logged in by verifying token
  const checkLoggedin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      const data = await response.json();
      setUser(data);
      setIsLoggedIn(true);
      return true;
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, isLoggedIn, checkLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};
