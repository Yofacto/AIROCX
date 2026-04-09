import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h1>AIROCX Admin</h1>
        <p>Enter password to access dashboard</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            autoFocus
          />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="login-btn">Access Dashboard</button>
        </form>
        <a href="/" className="back-link">← Back to Website</a>
      </div>
    </div>
  );
}

export default AdminLogin;
