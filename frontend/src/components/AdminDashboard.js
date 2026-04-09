import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharactersTab from './CharactersTab';
import ShowcaseTab from './ShowcaseTab';
import MerchTab from './MerchTab';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('characters');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🎬 AIROCX Admin Dashboard</h1>
        <div className="admin-actions">
          <a href="/" className="btn-outline" target="_blank">View Website</a>
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'characters' ? 'active' : ''}`}
          onClick={() => setActiveTab('characters')}
        >
          Characters
        </button>
        <button 
          className={`admin-tab ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          Showcase
        </button>
        <button 
          className={`admin-tab ${activeTab === 'merch' ? 'active' : ''}`}
          onClick={() => setActiveTab('merch')}
        >
          Merch
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'characters' && <CharactersTab />}
        {activeTab === 'showcase' && <ShowcaseTab />}
        {activeTab === 'merch' && <MerchTab />}
      </div>
    </div>
  );
}

export default AdminDashboard;
