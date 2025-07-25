import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterRecipes,
    filterBy,
    setFilterBy,
    minTime,
    maxTime,
    setTimeRange
  } = useRecipeStore();

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterBy, minTime, maxTime, filterRecipes]);

  return (
    <div className="search-bar">
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="title">By Title</option>
          <option value="ingredients">By Ingredients</option>
        </select>
      </div>
      
      <div className="time-filters">
        <label>
          Min Time:
          <input 
            type="number" 
            value={minTime}
            onChange={(e) => setTimeRange(Number(e.target.value), maxTime)}
            min="0"
          />
        </label>
        <label>
          Max Time:
          <input 
            type="number" 
            value={maxTime}
            onChange={(e) => setTimeRange(minTime, Number(e.target.value))}
            min="0"
          />
        </label>
      </div>
    </div>
  );
};

export default SearchBar;