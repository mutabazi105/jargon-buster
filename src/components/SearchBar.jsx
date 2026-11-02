// src/components/SearchBar.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function SearchBar() {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, uniqueCategories, sortOrder, setSortOrder } = useContext(GlossaryContext);

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Begriff suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ccc" }}
      />

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

      {/* Ongeraho Sorting Dropdown */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="az">Sortierung: A-Z</option>
        <option value="za">Sortierung: Z-A</option>
      </select>
    </div>
  );
}

export default SearchBar;