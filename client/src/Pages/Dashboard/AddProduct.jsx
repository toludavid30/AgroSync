import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    location: '',
    category: '',
    scanId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add product');
      setMessage('Product added successfully!');
      setForm({ title: '', description: '', price: '', quantity: '', location: '', category: '', scanId: '' });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price (₦)" type="number" min="0" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" min="1" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="scanId" value={form.scanId} onChange={handleChange} placeholder="Scan ID (optional)" />
        <button className="subBG2 subColor" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
        {message && <div className="add-product-message">{message}</div>}
      </form>
    </div>
  );
};

export default AddProduct;
