// src/components/FlashcardMode.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function FlashcardMode() {
  const { visibleTerms } = useContext(GlossaryContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (visibleTerms.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Keine Karteikarten verfügbar.</p>;
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
    <div className="flashcard-container">
      <h3>Karteikarten-Modus</h3>
      
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
      >
        {isFlipped ? (
          <p><strong>Definition:</strong> {currentCard.definition}</p>
        ) : (
          <h2>{currentCard.term}</h2>
        )}
      </div>

      <div className="flashcard-controls">
        <button onClick={prevCard}>◀ Zurück</button>
        <span>Karte {safeIndex + 1} von {visibleTerms.length}</span>
        <button onClick={nextCard}>Weiter ▶</button>
      </div>
    </div>
  );
}

export default FlashcardMode;