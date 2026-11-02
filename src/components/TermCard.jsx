// src/components/TermCard.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function TermCard({ termData }) {
  // 1. Get dispatch from context to toggle favorite
  const { dispatch } = useContext(GlossaryContext);

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{termData.term}</h3>
        
        {/* 2. Toggle Favorite Button */}
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: termData.id })}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
        >
          {termData.isFavorite ? "★" : "☆"}
        </button>
      </div>
      
      <p><strong>Kategorie:</strong> {termData.category}</p>
      <p>{termData.definition}</p>
    </div>
  );
}

export default TermCard;