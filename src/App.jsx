// src/App.jsx
import React, { useState } from 'react';
import { GlossaryProvider } from './context/GlossaryProvider';
import GlossaryList from './components/GlossaryList';
import SearchBar from './components/SearchBar';
import AddTermForm from './components/AddTermForm';
import FlashcardMode from './components/FlashcardMode'; // <-- Iyi ni nshya
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <GlossaryProvider>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Jargon Buster</h1>
        <p>Interaktives Wissenschafts-Glossar</p>
        <hr />
        
        <SearchBar />

        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setViewMode("list")} 
            style={{ padding: "10px", backgroundColor: viewMode === "list" ? "#333" : "#ccc", color: viewMode === "list" ? "white" : "black", cursor: "pointer" }}
          >
            Listenansicht
          </button>
          <button 
            onClick={() => setViewMode("flashcards")} 
            style={{ padding: "10px", backgroundColor: viewMode === "flashcards" ? "#333" : "#ccc", color: viewMode === "flashcards" ? "white" : "black", cursor: "pointer" }}
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