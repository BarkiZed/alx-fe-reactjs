import useRecipeStore from '../store/recipeStore'

const FavoriteButton = ({ recipeId }) => {
  const [addFavorite, removeFavorite, isFavorite] = useRecipeStore(state => [
    state.addFavorite,
    state.removeFavorite,
    state.isFavorite
  ])

  const handleClick = () => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`favorite-btn ${isFavorite(recipeId) ? 'active' : ''}`}
      aria-label={isFavorite(recipeId) ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite(recipeId) ? '❤️' : '🤍'}
    </button>
  )
}

export default FavoriteButton
