// src/components/TermCard.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function TermCard({ termData }) {
  const { dispatch } = useContext(GlossaryContext);

  // Local state for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    term: termData.term,
    definition: termData.definition,
    category: termData.category
  });

  // Handle input changes in edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited term
  const handleSave = () => {
    if (!editData.term.trim() || !editData.definition.trim() || !editData.category.trim()) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    dispatch({
      type: 'EDIT_TERM',
      payload: {
        id: termData.id,
        updatedData: editData
      }
    });
    setIsEditing(false);
  };

  // Delete the term with confirmation
  const handleDelete = () => {
    if (window.confirm(`Möchten Sie "${termData.term}" wirklich löschen?`)) {
      dispatch({ type: 'DELETE_TERM', payload: termData.id });
    }
  };

  // Render edit form if in edit mode
  if (isEditing) {
    return (
      <div className="term-card edit-mode">
        <h3>Begriff bearbeiten</h3>
        <input 
          name="term" 
          value={editData.term} 
          onChange={handleChange} 
          placeholder="Begriff"
          className="edit-input"
        />
        <textarea 
          name="definition" 
          value={editData.definition} 
          onChange={handleChange} 
          placeholder="Definition"
          className="edit-input"
        />
        <input 
          name="category" 
          value={editData.category} 
          onChange={handleChange} 
          placeholder="Kategorie"
          className="edit-input"
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="btn-save">Speichern</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Abbrechen</button>
        </div>
      </div>
    );
  }

  // Render normal term card
  return (
    <div className="term-card">
      <div className="term-header">
        <h3>{termData.term}</h3>
        
        <div className="term-actions">
          <button 
            className="favorite-btn"
            onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: termData.id })}
            title="Favorit"
          >
            {termData.isFavorite ? "★" : "☆"}
          </button>

          <button 
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            title="Bearbeiten"
          >
            ✏️
          </button>

          <button 
            onClick={handleDelete}
            className="delete-btn"
            title="Löschen"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <span className="term-category">{termData.category}</span>
      <p>{termData.definition}</p>
    </div>
  );
}

export default TermCard;