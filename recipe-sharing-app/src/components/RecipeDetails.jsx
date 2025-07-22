import { useParams } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'
import FavoriteButton from './FavoriteButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  
  if (!recipe) return <div>Recipe not found</div>

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <FavoriteButton recipeId={recipe.id} />
      </div>
      <p>{recipe.description}</p>
      
      {recipe.tags && (
        <div className="tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      {/* Rest of your recipe details */}
    </div>
  )
}

export default RecipeDetails
