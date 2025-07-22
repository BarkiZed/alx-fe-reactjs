import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.getFilteredRecipes())

  return (
    <div className="recipe-list">
      {filteredRecipes.length === 0 ? (
        <p>No recipes match your search criteria.</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
            {recipe.cookingTime && <p>⏱️ {recipe.cookingTime} minutes</p>}
            {recipe.rating && <p>⭐ {recipe.rating}/5</p>}
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList
