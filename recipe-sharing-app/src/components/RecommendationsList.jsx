import { useEffect } from 'react'
import useRecipeStore from '../store/recipeStore'
import FavoriteButton from './FavoriteButton'

const RecommendationsList = () => {
  const [recommendations, generateRecommendations] = useRecipeStore(state => [
    state.recommendations,
    state.generateRecommendations
  ])

  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="recommendations-list">
      <h2>Recommended For You</h2>
      <div className="recipes-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.tags && (
              <div className="tags">
                {recipe.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <FavoriteButton recipeId={recipe.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationsList
