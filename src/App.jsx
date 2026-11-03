// src/App.jsx
import React, { useState, useContext } from 'react';
import { GlossaryProvider, GlossaryContext } from './context/GlossaryProvider';
import GlossaryList from './components/GlossaryList';
import SearchBar from './components/SearchBar';
import AddTermForm from './components/AddTermForm';
import FlashcardMode from './components/FlashcardMode';
import './App.css';

// Main App component inside the Provider to access context
function MainApp() {
  const [viewMode, setViewMode] = useState("list");
  const { theme, setTheme } = useContext(GlossaryContext);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Jargon Buster</h1>
          <p className="subtitle">Interaktives Wissenschafts-Glossar</p>
        </div>
        {/* Dark mode toggle button */}
        <button onClick={toggleTheme} style={{ fontSize: "24px", background: "none", border: "none", cursor: "pointer" }}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
      
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
  );
}

// Wrapper component
function App() {
  return (
    <GlossaryProvider>
      <MainApp />
    </GlossaryProvider>
  );
}

export default App;