// src/components/SearchBar.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function SearchBar() {
  // 1. Get search states and unique categories from context
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, uniqueCategories } = useContext(GlossaryContext);

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {/* 2. Search Input */}
      <input
        type="text"
        placeholder="Begriff suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ccc" }}
      />

      {/* 3. Category Filter (Dynamically mapped) */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="Alle">Alle Kategorien</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;