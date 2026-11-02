// src/components/TermCard.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function TermCard({ termData }) {
  const { dispatch } = useContext(GlossaryContext);

  // Function to handle deletion with confirmation
  const handleDelete = () => {
    // Show a confirmation dialog before deleting
    const isConfirmed = window.confirm(
      `Möchten Sie den Begriff "${termData.term}" wirklich löschen?`
    );

    if (isConfirmed) {
      dispatch({ type: 'DELETE_TERM', payload: termData.id });
    }
  };

  return (
    <div className="term-card">
      <div className="term-header">
        <h3>{termData.term}</h3>
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Favorite Button */}
          <button 
            className="favorite-btn"
            onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: termData.id })}
            title="Favorit"
          >
            {termData.isFavorite ? "★" : "☆"}
          </button>

          {/* Delete Button with Confirmation */}
          <button 
            onClick={handleDelete}
            style={{ 
              background: "none", 
              border: "none", 
              fontSize: "20px", 
              cursor: "pointer", 
              color: "#e74c3c" 
            }}
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