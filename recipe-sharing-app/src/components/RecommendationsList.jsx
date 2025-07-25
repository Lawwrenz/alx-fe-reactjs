import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, addFavorite } = useRecipeStore();

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="recommendations-list">
      <h2>Recommended For You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Add some favorites first!</p>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recommendation-card">
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
                  addFavorite(recipe.id);
                }}
                className="add-favorite"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;