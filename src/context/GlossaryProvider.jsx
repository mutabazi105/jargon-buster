// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer, useState, useEffect, useMemo } from 'react';

// 1. Initial State (Mock Data)
const initialTerms = [
  { id: 1, term: "Klimawandel", definition: "Die langfristige Veränderung der Temperaturen und Wetterbedingungen auf der Erde.", category: "Klima", isFavorite: false },
  { id: 2, term: "Künstliche Intelligenz", definition: "Die Fähigkeit von Maschinen, Aufgaben zu übernehmen, die normalerweise menschliche Intelligenz erfordern.", category: "KI", isFavorite: false },
  { id: 3, term: "Photosynthese", definition: "Der Prozess, bei dem Pflanzen Lichtenergie in chemische Energie umwandeln.", category: "Biologie", isFavorite: false },
  { id: 4, term: "Algorithmus", definition: "Eine eindeutige Handlungsvorschrift zur Lösung eines Problems.", category: "Informatik", isFavorite: false },
];

// 2. Create Context
export const GlossaryContext = createContext();

// 3. Reducer Function (Handles state changes)
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

// 4. Provider Component
export const GlossaryProvider = ({ children }) => {
  const [terms, dispatch] = useReducer(glossaryReducer, initialTerms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  // 5. useEffect: Save favorites to localStorage
  useEffect(() => {
    const favorites = terms.filter(t => t.isFavorite).map(t => t.id);
    localStorage.setItem('jargon-buster-favorites', JSON.stringify(favorites));
  }, [terms]);

  // 6. useMemo: Compute visible terms based on search and category
  const visibleTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Alle" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, searchTerm, selectedCategory]);

  // 7. useMemo: Dynamically extract unique categories from terms
  const uniqueCategories = useMemo(() => {
    const categories = terms.map((term) => term.category);
    return [...new Set(categories)];
  }, [terms]);

  return (
    <GlossaryContext.Provider value={{ 
      terms, 
      dispatch, 
      searchTerm, 
      setSearchTerm, 
      selectedCategory, 
      setSelectedCategory,
      visibleTerms,
      uniqueCategories 
    }}>
      {children}
    </GlossaryContext.Provider>
  );
};