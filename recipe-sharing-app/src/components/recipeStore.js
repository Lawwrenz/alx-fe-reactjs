import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  // Existing actions
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
      filteredRecipes: get().searchTerm
        ? [...state.recipes, { ...newRecipe, id: Date.now() }].filter(
            (recipe) =>
              recipe.title
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
          )
        : [...state.recipes, { ...newRecipe, id: Date.now() }],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      filteredRecipes: state.filteredRecipes.filter(
        (recipe) => recipe.id !== id
      ),
    })),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
      filteredRecipes: state.filteredRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),

  // New search actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));
