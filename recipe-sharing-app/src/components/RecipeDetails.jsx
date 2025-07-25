import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-details">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Recipes
      </button>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div className="recipe-actions">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;