// src/components/AddTermForm.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function AddTermForm() {
  const { dispatch } = useContext(GlossaryContext);

  // 1. Local state for form inputs (category starts empty so user can type anything)
  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "" 
  });

  // 2. Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.term || !formData.definition || !formData.category) return;

    dispatch({
      type: 'ADD_TERM',
      payload: {
        id: Date.now(),
        term: formData.term,
        definition: formData.definition,
        category: formData.category, // Takes whatever the user typed
        isFavorite: false
      }
    });

    // Reset form
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
        
        {/* 4. Changed from select to text input for free typing */}
        <input
          type="text"
          name="category"
          placeholder="Kategorie (z.B. Physik, Chemie)"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />

        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddTermForm;