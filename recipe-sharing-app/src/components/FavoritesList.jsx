import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const { favorites, recipes, removeFavorite } = useRecipeStore();
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="favorites-list">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You haven't favorited any recipes yet!</p>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="favorite-card">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p className="description-preview">
                  {recipe.description.length > 100
                    ? `${recipe.description.substring(0, 100)}...`
                    : recipe.description}
                </p>
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(recipe.id);
                }}
                className="remove-favorite"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;