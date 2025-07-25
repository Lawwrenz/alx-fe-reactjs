import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => 
    state.searchTerm ? state.filteredRecipes : state.recipes
  );

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      <SearchBar />
      {recipes.length === 0 ? (
        <p>No recipes found. {useRecipeStore.getState().searchTerm ? 'Try a different search.' : 'Add one to get started!'}</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p className="description-preview">
                  {recipe.description.length > 100
                    ? `${recipe.description.substring(0, 100)}...`
                    : recipe.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;