// src/context/GlossaryProvider.jsx
import React, { createContext, useReducer } from 'react';

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

// 4. Provider Component (Wraps the app and provides state)
export const GlossaryProvider = ({ children }) => {
  const [terms, dispatch] = useReducer(glossaryReducer, initialTerms);

  return (
    <GlossaryContext.Provider value={{ terms, dispatch }}>
      {children}
    </GlossaryContext.Provider>
  );
};