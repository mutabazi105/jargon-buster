// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer, useState, useEffect, useMemo } from 'react';

// 1. Initial Data
const initialTerms = [
  { id: 1, term: "Klimawandel", definition: "Die langfristige Veränderung der Temperaturen und Wetterbedingungen auf der Erde.", category: "Klima", isFavorite: false },
  { id: 2, term: "Künstliche Intelligenz", definition: "Die Fähigkeit von Maschinen, Aufgaben zu übernehmen, die normalerweise menschliche Intelligenz erfordern.", category: "KI", isFavorite: false },
  { id: 3, term: "Photosynthese", definition: "Der Prozess, bei dem Pflanzen Lichtenergie in chemische Energie umwandeln.", category: "Biologie", isFavorite: false },
  { id: 4, term: "Algorithmus", definition: "Eine eindeutige Handlungsvorschrift zur Lösung eines Problems.", category: "Informatik", isFavorite: false },
];

export const GlossaryContext = createContext();

// 2. Reducer Function
const glossaryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TERM':
      return [...state, action.payload];
    case 'DELETE_TERM':
      return state.filter((term) => term.id !== action.payload);
    case 'TOGGLE_FAVORITE':
      return state.map((term) =>
        term.id === action.payload
          ? { ...term, isFavorite: !term.isFavorite }
          : term
      );
    default:
      return state;
  }
};

// 3. Load Initial State from localStorage
const getInitialState = () => {
  try {
    const savedTerms = localStorage.getItem('jargon-buster-terms');
    return savedTerms ? JSON.parse(savedTerms) : initialTerms;
  } catch (error) {
    return initialTerms;
  }
};

// 4. Provider Component
export const GlossaryProvider = ({ children }) => {
  const [terms, dispatch] = useReducer(glossaryReducer, [], getInitialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [sortOrder, setSortOrder] = useState("az");

  // 5. Save terms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jargon-buster-terms', JSON.stringify(terms));
  }, [terms]);

  // 6. Compute visible terms (Filter and Sort)
  const visibleTerms = useMemo(() => {
    // Safety check to prevent errors if terms is undefined
    if (!Array.isArray(terms)) return []; 

    const filtered = terms.filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Alle" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "az") return a.term.localeCompare(b.term);
      if (sortOrder === "za") return b.term.localeCompare(a.term);
      return 0;
    });
  }, [terms, searchTerm, selectedCategory, sortOrder]);

  // 7. Extract unique categories dynamically
  const uniqueCategories = useMemo(() => {
    if (!Array.isArray(terms)) return [];
    const categories = terms.map((term) => term.category);
    return [...new Set(categories)];
  }, [terms]);

  return (
    <GlossaryContext.Provider value={{ 
      terms, dispatch, searchTerm, setSearchTerm, 
      selectedCategory, setSelectedCategory, visibleTerms, uniqueCategories,
      sortOrder, setSortOrder
    }}>
      {children}
    </GlossaryContext.Provider>
  );
};