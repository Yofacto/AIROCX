import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function CharactersTab() {
  const [characters, setCharacters] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/characters`);
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleEdit = (char) => {
    setEditing(char._id);
    setFormData(char);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BACKEND_URL}/api/characters/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCharacters();
        setEditing(null);
        alert('Character updated successfully!');
      }
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Error saving character');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this character?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/characters/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCharacters();
      alert('Character deleted!');
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handleAdd = async () => {
    const newChar = {
      name: 'New Character',
      role: 'The Role',
      desc: 'Short description',
      bio: 'Full biography',
      episodes: '0',
      fans: '0',
      power: 'Power Name',
      color: '#6c5ce7',
      svg: '<svg></svg>',
      image: ''
    };

    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${BACKEND_URL}/api/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newChar)
      });
      fetchCharacters();
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Manage Characters</h2>
        <button onClick={handleAdd} className="btn-primary">+ Add Character</button>
      </div>

      <div className="items-grid">
        {characters.map((char) => (
          <div key={char._id} className="admin-card">
            {editing === char._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input name="role" value={formData.role} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea name="desc" value={formData.desc} onChange={handleChange} rows={2} />
                </div>
                <div className="form-group">
                  <label>Full Biography</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Episodes</label>
                    <input name="episodes" value={formData.episodes} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Fans</label>
                    <input name="fans" value={formData.fans} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Power</label>
                    <input name="power" value={formData.power} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Color (gradient or hex)</label>
                  <input name="color" value={formData.color} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Image URL (optional - overrides SVG)</label>
                  <input name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>SVG Code (for advanced users)</label>
                  <textarea name="svg" value={formData.svg} onChange={handleChange} rows={6} 
                            style={{fontFamily: 'monospace', fontSize: '12px'}} />
                </div>
                <div className="form-actions">
                  <button onClick={handleSave} className="btn-primary">Save</button>
                  <button onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-preview" style={{background: char.color}}>
                  {char.image ? (
                    <img src={char.image} alt={char.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div dangerouslySetInnerHTML={{__html: char.svg}} />
                  )}
                </div>
                <h3>{char.name}</h3>
                <p className="role">{char.role}</p>
                <p className="desc-small">{char.desc}</p>
                <div className="stats-mini">
                  <span>📺 {char.episodes}</span>
                  <span>👥 {char.fans}</span>
                  <span>⚡ {char.power}</span>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(char)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(char._id)} className="btn-delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersTab;
