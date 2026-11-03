// src/components/SearchBar.jsx
import React, { useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function SearchBar() {
  const { 
    searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, 
    uniqueCategories, sortOrder, setSortOrder,
    showFavoritesOnly, setShowFavoritesOnly 
  } = useContext(GlossaryContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Begriff suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="Alle">Alle Kategorien</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="az">Sortierung: A-Z</option>
        <option value="za">Sortierung: Z-A</option>
      </select>

      {/* Checkbox for Favorites only filter */}
      <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
        <input 
          type="checkbox" 
          checked={showFavoritesOnly} 
          onChange={(e) => setShowFavoritesOnly(e.target.checked)} 
        />
        Nur Favoriten
      </label>
    </div>
  );
}

export default SearchBar;