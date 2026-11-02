// src/App.jsx
import React from 'react';
import { GlossaryProvider } from './context/GlossaryProvider';
import GlossaryList from './components/GlossaryList';
import SearchBar from './components/SearchBar';
import AddTermForm from './components/AddTermForm'; // Import the new form
import './App.css';

function App() {
  return (
    <GlossaryProvider>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Jargon Buster</h1>
        <p>Interaktives Wissenschafts-Glossar</p>
        <hr />
        
        <SearchBar />
        <GlossaryList />
        
        {/* Render the form below the list */}
        <AddTermForm /> 
      </div>
    </GlossaryProvider>
  );
}

export default App;