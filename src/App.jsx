// src/App.jsx
import React, { useState } from 'react';
import { GlossaryProvider } from './context/GlossaryProvider';
import GlossaryList from './components/GlossaryList';
import SearchBar from './components/SearchBar';
import AddTermForm from './components/AddTermForm';
import FlashcardMode from './components/FlashcardMode';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <GlossaryProvider>
      <div className="container">
        <h1>Jargon Buster</h1>
        <p className="subtitle">Interaktives Wissenschafts-Glossar</p>
        <hr />
        
        <SearchBar />

        <div className="view-toggle">
          <button 
            className={viewMode === "list" ? "active" : ""} 
            onClick={() => setViewMode("list")}
          >
            Listenansicht
          </button>
          <button 
            className={viewMode === "flashcards" ? "active" : ""} 
            onClick={() => setViewMode("flashcards")}
          >
            Karteikarten
          </button>
        </div>

        {viewMode === "list" ? (
          <>
            <GlossaryList />
            <AddTermForm />
          </>
        ) : (
          <FlashcardMode />
        )}
      </div>
    </GlossaryProvider>
  );
}

export default App;