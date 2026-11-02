// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer, useState, useEffect, useMemo } from 'react';

const initialTerms = [ /* ... (siga initialTerms nk'uko biri) ... */ ];
export const GlossaryContext = createContext();
const glossaryReducer = (state, action) => { /* ... (siga reducer nk'uko iri) ... */ };
const getInitialState = () => { /* ... (siga iyi nk'uko iri) ... */ };

export const GlossaryProvider = ({ children }) => {
  const [terms, dispatch] = useReducer(glossaryReducer, [], getInitialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  
  // 1. Ongeraho sortOrder
  const [sortOrder, setSortOrder] = useState("az"); 

  useEffect(() => {
    localStorage.setItem('jargon-buster-terms', JSON.stringify(terms));
  }, [terms]);

  // 2. Hindura visibleTerms ngo itondeke
  const visibleTerms = useMemo(() => {
    const filtered = terms.filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Alle" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Gutondeka (Sorting)
    return [...filtered].sort((a, b) => {
      if (sortOrder === "az") return a.term.localeCompare(b.term);
      if (sortOrder === "za") return b.term.localeCompare(a.term);
      return 0;
    });
  }, [terms, searchTerm, selectedCategory, sortOrder]);

  const uniqueCategories = useMemo(() => {
    const categories = terms.map((term) => term.category);
    return [...new Set(categories)];
  }, [terms]);

  return (
    <GlossaryContext.Provider value={{ 
      terms, dispatch, searchTerm, setSearchTerm, 
      selectedCategory, setSelectedCategory, visibleTerms, uniqueCategories,
      sortOrder, setSortOrder // <-- Ongeraho iyi
    }}>
      {children}
    </GlossaryContext.Provider>
  );
};