// src/components/AddTermForm.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function AddTermForm() {
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
    <div className="add-form">
      <h3>Neuen Begriff hinzufügen</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          placeholder="Begriff (z.B. Gravitation)"
          value={formData.term}
          onChange={handleChange}
        />
        
        <textarea
          name="definition"
          placeholder="Definition..."
          value={formData.definition}
          onChange={handleChange}
          style={{ minHeight: "100px" }}
        />
        
        <input
          type="text"
          name="category"
          list="category-options"
          placeholder="Kategorie wählen oder neu eingeben..."
          value={formData.category}
          onChange={handleChange}
        />
        
        <datalist id="category-options">
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default AddTermForm;