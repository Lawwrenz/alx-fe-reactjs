import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  // Existing state
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  filterBy: "title", // Can be 'title', 'ingredients', or 'time'
  minTime: 0,
  maxTime: 0,

  // New state for favorites and recommendations
  favorites: [],
  recommendations: [],

  // Existing actions
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [
        ...state.recipes,
        { ...newRecipe, id: Date.now() },
      ];
      return {
        recipes: updatedRecipes,
        filteredRecipes: get().applyFilters(updatedRecipes),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      filteredRecipes: state.filteredRecipes.filter(
        (recipe) => recipe.id !== id
      ),
      favorites: state.favorites.filter((favId) => favId !== id),
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

  // Search and filter actions
  setSearchTerm: (term) =>
    set({ searchTerm: term }, () => get().filterRecipes()),
  setFilterBy: (filter) =>
    set({ filterBy: filter }, () => get().filterRecipes()),
  setTimeRange: (min, max) =>
    set({ minTime: min, maxTime: max }, () => get().filterRecipes()),

  applyFilters: (recipesToFilter) => {
    const { searchTerm, filterBy, minTime, maxTime } = get();
    let filtered = recipesToFilter;

    if (searchTerm) {
      filtered = filtered.filter((recipe) => {
        if (filterBy === "title") {
          return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (filterBy === "ingredients" && recipe.ingredients) {
          return recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return true;
      });
    }

    if (minTime > 0 || maxTime > 0) {
      filtered = filtered.filter((recipe) => {
        const time = recipe.prepTime || 0;
        return (!minTime || time >= minTime) && (!maxTime || time <= maxTime);
      });
    }

    return filtered;
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: get().applyFilters(state.recipes),
    })),

  // New actions for favorites and recommendations
  addFavorite: (recipeId) =>
    set(
      (state) => {
        if (state.favorites.includes(recipeId)) {
          return state; // Already a favorite, no change needed
        }
        return {
          favorites: [...state.favorites, recipeId],
        };
      },
      () => get().generateRecommendations()
    ),

  removeFavorite: (recipeId) =>
    set(
      (state) => ({
        favorites: state.favorites.filter((id) => id !== recipeId),
      }),
      () => get().generateRecommendations()
    ),

  generateRecommendations: () =>
    set((state) => {
      if (state.favorites.length === 0) {
        return { recommendations: [] };
      }

      // Get all favorite recipes
      const favoriteRecipes = state.favorites
        .map((id) => state.recipes.find((recipe) => recipe.id === id))
        .filter(Boolean); // Filter out undefined in case recipe was deleted

      // Extract unique ingredients from favorites
      const favoriteIngredients = new Set();
      favoriteRecipes.forEach((recipe) => {
        if (recipe.ingredients) {
          recipe.ingredients.forEach((ing) =>
            favoriteIngredients.add(ing.toLowerCase())
          );
        }
      });

      // Find recipes that share ingredients with favorites but aren't already favorites
      const recommended = state.recipes
        .filter(
          (recipe) =>
            !state.favorites.includes(recipe.id) && // Not already a favorite
            recipe.ingredients && // Has ingredients
            recipe.ingredients.some(
              (
                ing // Shares at least one ingredient
              ) => favoriteIngredients.has(ing.toLowerCase())
            )
        )
        .slice(0, 5); // Limit to 5 recommendations

      return { recommendations: recommended };
    }),

  // Helper to check if a recipe is favorited
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
}));
