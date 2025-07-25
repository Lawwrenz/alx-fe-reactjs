import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one to get started!</p>
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