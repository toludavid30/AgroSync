import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user info');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!user) return <div className="profile-error">User not found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Welcome, {user.fullName || user.name}</h2>
        <p className="profile-email">Email: {user.email}</p>
        <p className="profile-role">Role: {user.role}</p>
        {/* Add more user info as needed */}
      </div>
    </div>
  );
};

export default UserProfile;
