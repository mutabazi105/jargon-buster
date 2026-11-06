// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer, useState, useEffect, useMemo } from 'react';

// 1. Initial State (Mock Data)
const initialTerms = [
  { id: 1, term: "Klimawandel", definition: "Die langfristige Veränderung der Temperaturen und Wetterbedingungen auf der Erde.", category: "Klima", isFavorite: false },
  { id: 2, term: "Künstliche Intelligenz", definition: "Die Fähigkeit von Maschinen, Aufgaben zu übernehmen, die normalerweise menschliche Intelligenz erfordern.", category: "KI", isFavorite: false },
  { id: 3, term: "Photosynthese", definition: "Der Prozess, bei dem Pflanzen Lichtenergie in chemische Energie umwandeln.", category: "Biologie", isFavorite: false },
  { id: 4, term: "Algorithmus", definition: "Eine eindeutige Handlungsvorschrift zur Lösung eines Problems.", category: "Informatik", isFavorite: false },
];

export const GlossaryContext = createContext();

// 2. Reducer Function (Handles state changes)
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
    case 'EDIT_TERM':
      return state.map((term) =>
        term.id === action.payload.id
          ? { ...term, ...action.payload.updatedData }
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
  const [theme, setTheme] = useState("light"); 
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 5. Save terms to localStorage
  useEffect(() => {
    localStorage.setItem('jargon-buster-terms', JSON.stringify(terms));
  }, [terms]);

  // 6. Compute visible terms (Filter, Search, Sort, Favorites)
  const visibleTerms = useMemo(() => {
    if (!Array.isArray(terms)) return [];

    const filtered = terms.filter((term) => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Alle" || term.category === selectedCategory;
      const matchesFavorites = showFavoritesOnly ? term.isFavorite : true; 
      
      return matchesSearch && matchesCategory && matchesFavorites;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "az") return a.term.localeCompare(b.term);
      if (sortOrder === "za") return b.term.localeCompare(a.term);
      return 0;
    });
  }, [terms, searchTerm, selectedCategory, sortOrder, showFavoritesOnly]);

  // 7. Extract unique categories
  const uniqueCategories = useMemo(() => {
    if (!Array.isArray(terms)) return [];
    const categories = terms.map((term) => term.category);
    return [...new Set(categories)];
  }, [terms]);

  return (
    <GlossaryContext.Provider value={{ 
      terms, dispatch, searchTerm, setSearchTerm, 
      selectedCategory, setSelectedCategory, visibleTerms, uniqueCategories,
      sortOrder, setSortOrder, theme, setTheme, 
      showFavoritesOnly, setShowFavoritesOnly 
    }}>
      {children}
    </GlossaryContext.Provider>
  );
};