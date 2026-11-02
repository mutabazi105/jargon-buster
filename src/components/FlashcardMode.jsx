// src/components/FlashcardMode.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function FlashcardMode() {
  const { visibleTerms } = useContext(GlossaryContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (visibleTerms.length === 0) {
    return <p>Keine Karteikarten verfügbar. Bitte suchen oder filtern Sie.</p>;
  }

  const safeIndex = currentIndex >= visibleTerms.length ? 0 : currentIndex;
  const currentCard = visibleTerms[safeIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleTerms.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleTerms.length) % visibleTerms.length);
    setIsFlipped(false);
  };

  return (
    <div style={{ border: "1px solid #4CAF50", padding: "20px", marginTop: "20px", borderRadius: "8px", textAlign: "center" }}>
      <h3>Karteikarten-Modus</h3>
      
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ 
          border: "2px solid #333", 
          padding: "40px", 
          margin: "20px 0", 
          cursor: "pointer",
          minHeight: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: isFlipped ? "#e8f5e9" : "#fff"
        }}
      >
        {isFlipped ? (
          <p><strong>Definition:</strong> {currentCard.definition}</p>
        ) : (
          <h2>{currentCard.term}</h2>
        )}
        <small style={{ marginTop: "10px", color: "#666" }}>(Klicken zum Umdrehen)</small>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevCard} style={{ padding: "10px 20px", cursor: "pointer" }}>◀ Zurück</button>
        <span>Karte {safeIndex + 1} von {visibleTerms.length}</span>
        <button onClick={nextCard} style={{ padding: "10px 20px", cursor: "pointer" }}>Weiter ▶</button>
      </div>
    </div>
  );
}

export default FlashcardMode;