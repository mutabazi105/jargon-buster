// src/components/AddTermForm.jsx
import React, { useState, useContext } from 'react';
import { GlossaryContext } from '../context/GlossaryProvider';

function AddTermForm() {
  // Get terms from context to check for duplicates
  const { dispatch, uniqueCategories, terms } = useContext(GlossaryContext);

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

    // 1. Basic validation: check if fields are empty
    if (!formData.term.trim() || !formData.definition.trim() || !formData.category.trim()) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    // 2. Helper function to normalize strings (remove spaces, hyphens, underscores, and lowercase)
    const cleanString = (str) => {
      return str.toLowerCase().replace(/[\s\-_]+/g, '');
    };

    // 3. Check for duplicate term (case-insensitive and ignores spaces/special characters)
    const isDuplicate = terms.some(
      (t) => cleanString(t.term) === cleanString(formData.term)
    );

    if (isDuplicate) {
      alert("Dieser Begriff existiert bereits im Glossar!");
      return;
    }

    // 4. Dispatch ADD_TERM action
    dispatch({
      type: 'ADD_TERM',
      payload: {
        id: Date.now(),
        term: formData.term.trim(),
        definition: formData.definition.trim(),
        category: formData.category.trim(),
        isFavorite: false
      }
    });

    // 5. Clear form after submission
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