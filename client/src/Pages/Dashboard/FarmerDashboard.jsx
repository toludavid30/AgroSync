import React, { useEffect, useState } from 'react';
import './FarmerDashboard.css';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import CropAIScanner from './CropAIScanner';

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const navigate = useNavigate();

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
        // Fetch products uploaded by this farmer
        const prodRes = await fetch(`${import.meta.env.VITE_BASEURL}/listings?farmerId=${data._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const prodData = await prodRes.json();
        const productsArray = Array.isArray(prodData) ? prodData : [];
        setProducts(productsArray);
        // Calculate sales and total sales
        let salesCount = 0;
        let salesSum = 0;
        productsArray.forEach(p => {
          salesCount += p.sales || 0;
          salesSum += (p.sales || 0) * (p.price || 0);
        });
        setSales(salesCount);
        setTotalSales(salesSum);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!user) return <div className="dashboard-error">User not found.</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Farmer Dashboard</h2>
        <p className="dashboard-welcome">Welcome, {user.fullName || user.name}</p>
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <span className="stat-label">Products Uploaded</span>
            <span className="stat-value heroColor">N/A</span>
          </div>
          <div className="dashboard-stat">
            <span className="stat-label">Number of Sales</span>
            <span className="stat-value heroColor">N/A</span>
          </div>
          <div className="dashboard-stat">
            <span className="stat-label">Total Sales (₦)</span>
            <span className="stat-value heroColor">N/A</span>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="subBG2 subColor" onClick={() => navigate('/dashboard/add-product')}>Add New Product</button>
          <button className="subBG2 subColor" onClick={() => navigate('/dashboard/crop-ai-scanner')}>Use Crop AI Scanner</button>
        </div>
        <h3 className="dashboard-section-title">Uploaded Products</h3>
        <ul className="dashboard-product-list">
          <li className="dashboard-product-empty">N/A</li>
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;
