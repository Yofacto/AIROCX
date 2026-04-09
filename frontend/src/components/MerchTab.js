import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function MerchTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/merch`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching merch:', error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setFormData(item);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BACKEND_URL}/api/merch/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchItems();
        setEditing(null);
        alert('Merch item updated!');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/merch/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchItems();
      alert('Product deleted!');
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleAdd = async () => {
    const newItem = {
      name: 'New Product',
      cat: 'Collectibles',
      price: 19.99,
      color: '#6c5ce7',
      emoji: '✨',
      image: ''
    };

    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/merch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });
      fetchItems();
    } catch (error) {
      console.error('Error adding:', error);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Manage Merch Store</h2>
        <button onClick={handleAdd} className="btn-primary">+ Add Product</button>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="admin-card">
            {editing === item._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="cat" value={formData.cat} onChange={handleChange}>
                    <option value="Collectibles">Collectibles</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Art & Posters">Art & Posters</option>
                    <option value="Toys & Games">Toys & Games</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Emoji Icon</label>
                  <input name="emoji" value={formData.emoji} onChange={handleChange} 
                         placeholder="e.g. 🧸" maxLength="2" />
                </div>
                <div className="form-group">
                  <label>Image URL (optional - overrides emoji)</label>
                  <input name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Background Color</label>
                  <input name="color" value={formData.color} onChange={handleChange} />
                </div>
                <div className="form-actions">
                  <button onClick={handleSave} className="btn-primary">Save</button>
                  <button onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-preview" style={{background: item.color}}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={{fontSize: '64px'}}>{item.emoji}</div>
                  )}
                </div>
                <div className="type-badge">{item.cat}</div>
                <h3>{item.name}</h3>
                <p className="price-big">${item.price.toFixed(2)}</p>
                <div className="card-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MerchTab;
