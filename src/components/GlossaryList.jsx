// src/components/GlossaryList.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';
import TermCard from './TermCard';

function GlossaryList() {
  const { visibleTerms, terms } = useContext(GlossaryContext);

  if (visibleTerms.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Keine Begriffe gefunden.</p>;
  }

  return (
    <div>
      <p style={{ marginBottom: "15px", color: "#6b7280" }}>
        Zeige {visibleTerms.length} von {terms.length} Begriffen
      </p>
      
      {visibleTerms.map((term) => (
        <TermCard key={term.id} termData={term} />
      ))}
    </div>
  );
}

export default GlossaryList;