// src/components/GlossaryList.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';
import TermCard from './TermCard';

function GlossaryList() {
  // 1. Get visibleTerms and total terms from context
  const { visibleTerms, terms } = useContext(GlossaryContext);

  // 2. Handle empty state
  if (visibleTerms.length === 0) {
    return <p>Keine Begriffe gefunden.</p>;
  }

  return (
    <div>
      {/* 3. Live Count Display */}
      <p>Zeige {visibleTerms.length} von {terms.length} Begriffen</p>
      
      {/* 4. Render the filtered list */}
      {visibleTerms.map((term) => (
        <TermCard key={term.id} termData={term} />
      ))}
    </div>
  );
}

export default GlossaryList;