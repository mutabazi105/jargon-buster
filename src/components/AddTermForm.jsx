// src/components/AddTermForm.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function AddTermForm() {
  // 1. Fata dispatch na uniqueCategories muri context
  const { dispatch, uniqueCategories } = useContext(GlossaryContext);

  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.term || !formData.definition || !formData.category) return;

    dispatch({
      type: 'ADD_TERM',
      payload: {
        id: Date.now(),
        term: formData.term,
        definition: formData.definition,
        category: formData.category,
        isFavorite: false
      }
    });

    setFormData({ term: "", definition: "", category: "" });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px", borderRadius: "8px" }}>
      <h3>Neuen Begriff hinzufügen</h3>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input
          type="text"
          name="term"
          placeholder="Begriff (z.B. Gravitation)"
          value={formData.term}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        
        <textarea
          name="definition"
          placeholder="Definition..."
          value={formData.definition}
          onChange={handleChange}
          style={{ padding: "8px", minHeight: "60px" }}
        />
        
        {/* 2. Hano ni ho dukoresha input ifite datalist */}
        <input
          type="text"
          name="category"
          list="category-options" // Ibi bihuza na datalist iri hasi
          placeholder="Kategorie wählen oder neu eingeben..."
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        
        {/* 3. Datalist: Iha amahitamo y'amajambo ariho */}
        <datalist id="category-options">
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddTermForm;