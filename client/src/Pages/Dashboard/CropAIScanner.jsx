import React, { useState } from 'react';
import './CropAIScanner.css';

const CropAIScanner = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }
    setLoading(true);
    setResult('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/ai/scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Scan failed');
      setResult(data.result || JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <form className="scanner-form" onSubmit={handleSubmit}>
        <h2>Crop AI Scanner</h2>
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
          required
        />
        <button className="subBG2 subColor" type="submit" disabled={loading}>{loading ? 'Scanning...' : 'Scan Crop'}</button>
        {result && <div className="scanner-result">Result: {result}</div>}
        {error && <div className="scanner-error">{error}</div>}
      </form>
    </div>
  );
};

export default CropAIScanner;
