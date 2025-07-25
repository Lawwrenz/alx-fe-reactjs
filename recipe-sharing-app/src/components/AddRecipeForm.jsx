import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

// Component for adding new recipes to the application
const AddRecipeForm = () => {
  // State for managing form inputs
  const [title, setTitle] = useState(''); // Stores the recipe title
  const [description, setDescription] = useState(''); // Stores the recipe description
  
  // Accessing the addRecipe action from the global store
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    
    // Validates that both fields contain non-whitespace characters
    if (!title.trim() || !description.trim()) return;
    
    // Adds the new recipe to the store
    addRecipe({ title, description });
    
    // Resets form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      {/* Form header */}
      <h2>Add New Recipe</h2>
      
      {/* Recipe title input field */}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Updates title state on change
          placeholder="Enter recipe title"
          required // Makes field mandatory
        />
      </div>
      
      {/* Recipe description textarea */}
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Updates description state on change
          placeholder="Enter recipe description"
          required // Makes field mandatory
        />
      </div>
      
      {/* Submission button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;