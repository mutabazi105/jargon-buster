// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer, useState, useEffect, useMemo } from 'react';

// 1. Initial Data (Fallback if localStorage is empty)
const initialTerms = [
  { id: 1, term: "Klimawandel", definition: "Die langfristige Veränderung der Temperaturen und Wetterbedingungen auf der Erde.", category: "Klima", isFavorite: false },
  { id: 2, term: "Künstliche Intelligenz", definition: "Die Fähigkeit von Maschinen, Aufgaben zu übernehmen, die normalerweise menschliche Intelligenz erfordern.", category: "KI", isFavorite: false },
  { id: 3, term: "Photosynthese", definition: "Der Prozess, bei dem Pflanzen Lichtenergie in chemische Energie umwandeln.", category: "Biologie", isFavorite: false },
  { id: 4, term: "Algorithmus", definition: "Eine eindeutige Handlungsvorschrift zur Lösung eines Problems.", category: "Informatik", isFavorite: false },
];

export const GlossaryContext = createContext();

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

// 2. Function to load initial state from localStorage
const getInitialState = () => {
  try {
    const savedTerms = localStorage.getItem('jargon-buster-terms');
    return savedTerms ? JSON.parse(savedTerms) : initialTerms;
  } catch (error) {
    return initialTerms;
  }
};

export const GlossaryProvider = ({ children }) => {
  // 3. Use getInitialState function to initialize the reducer
  const [terms, dispatch] = useReducer(glossaryReducer, [], getInitialState);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  // 4. useEffect: Save ALL terms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jargon-buster-terms', JSON.stringify(terms));
  }, [terms]);

  // 5. useMemo: Compute visible terms
  const visibleTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Alle" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, searchTerm, selectedCategory]);

  // 6. useMemo: Extract unique categories dynamically
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