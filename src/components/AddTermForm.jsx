// src/components/AddTermForm.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function AddTermForm() {
  // Get dispatch from context to update the global state
  const { dispatch } = useContext(GlossaryContext);

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "Klima"
  });

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.term || !formData.definition) return;

    // Dispatch the action to add a new term
    dispatch({
      type: 'ADD_TERM',
      payload: {
        id: Date.now(), // Generate a unique ID based on timestamp
        term: formData.term,
        definition: formData.definition,
        category: formData.category,
        isFavorite: false
      }
    });

    // Reset form after submission
    setFormData({ term: "", definition: "", category: "Klima" });
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
        
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          style={{ padding: "8px" }}
        >
          <option value="Klima">Klima</option>
          <option value="KI">KI</option>
          <option value="Biologie">Biologie</option>
          <option value="Informatik">Informatik</option>
        </select>

        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Hinzufügen
        </button>
      </form>
    </div>
  );
}

export default AddTermForm;