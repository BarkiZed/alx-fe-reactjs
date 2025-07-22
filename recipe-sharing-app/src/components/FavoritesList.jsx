import useRecipeStore from '../store/recipeStore'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => 
      state.recipes.find(recipe => recipe.id === id)
    ).filter(Boolean) // Filter out undefined if recipe not found

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <p>You haven't favorited any recipes yet.</p>
      </div>
    )
  }

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      <div className="recipes-grid">
        {favorites.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <FavoriteButton recipeId={recipe.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList
