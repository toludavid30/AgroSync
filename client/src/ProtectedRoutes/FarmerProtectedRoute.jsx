import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const FarmerProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Not authenticated');
        const user = await response.json();
        if (user.role === 'FARMER') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <Outlet />;
};

export default FarmerProtectedRoute;