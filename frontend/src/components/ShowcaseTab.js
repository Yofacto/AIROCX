import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function ShowcaseTab() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/showcase`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching showcase:', error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setFormData(item);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BACKEND_URL}/api/showcase/${editing}`, {
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
        alert('Showcase item updated!');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/showcase/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchItems();
      alert('Item deleted!');
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleAdd = async () => {
    const newItem = {
      type: 'image',
      cat: 'image',
      title: 'New Item',
      desc: 'Description',
      ytId: '',
      color: '#6c5ce7',
      image: '',
      large: false
    };

    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/showcase`, {
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
        <h2>Manage Showcase Items</h2>
        <button onClick={handleAdd} className="btn-primary">+ Add Item</button>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="admin-card">
            {editing === item._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="cat" value={formData.cat} onChange={handleChange}>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="bts">Behind the Scenes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea name="desc" value={formData.desc} onChange={handleChange} rows={2} />
                </div>
                {formData.type === 'video' && (
                  <div className="form-group">
                    <label>YouTube Video ID</label>
                    <input name="ytId" value={formData.ytId} onChange={handleChange} 
                           placeholder="e.g. dQw4w9WgXcQ" />
                  </div>
                )}
                <div className="form-group">
                  <label>Image URL (optional)</label>
                  <input name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Background Color (fallback)</label>
                  <input name="color" value={formData.color} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" name="large" checked={formData.large} onChange={handleChange} />
                    &nbsp; Large (2x width)
                  </label>
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
                    <img src={item.image} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={{fontSize: '48px', color: 'rgba(255,255,255,0.3)'}}>
                      {item.type === 'video' ? '▶' : '◆'}
                    </div>
                  )}
                </div>
                <div className="type-badge">{item.type === 'video' ? '🎥' : '🖼️'} {item.cat}</div>
                <h3>{item.title}</h3>
                <p className="desc-small">{item.desc}</p>
                {item.large && <span className="badge-large">LARGE</span>}
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

export default ShowcaseTab;
