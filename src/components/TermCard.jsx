// src/components/TermCard.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function TermCard({ termData }) {
  const { dispatch } = useContext(GlossaryContext);

  return (
    <div className="term-card">
      <div className="term-header">
        <h3>{termData.term}</h3>
        <button 
          className="favorite-btn"
          onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: termData.id })}
        >
          {termData.isFavorite ? "★" : "☆"}
        </button>
      </div>
      
      <span className="term-category">{termData.category}</span>
      <p>{termData.definition}</p>
    </div>
  );
}

export default TermCard;