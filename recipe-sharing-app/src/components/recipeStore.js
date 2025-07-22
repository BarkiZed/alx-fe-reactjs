import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  
  // Recipe CRUD operations (existing)
  // ... (keep your existing addRecipe, deleteRecipe, updateRecipe functions)
  
  // Favorites functionality
  addFavorite: (recipeId) => set(state => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] }
    }
    return state
  }),
  
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
  
  // Recommendations functionality
  generateRecommendations: () => set(state => {
    const { recipes, favorites } = state
    
    if (favorites.length === 0) {
      // If no favorites, recommend popular recipes (mock implementation)
      return { 
        recommendations: [...recipes]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3) 
      }
    }
    
    // Get tags from favorite recipes
    const favoriteTags = recipes
      .filter(recipe => favorites.includes(recipe.id))
      .flatMap(recipe => recipe.tags || [])
    
    // Recommend recipes with similar tags
    const recommended = recipes
      .filter(recipe => 
        !favorites.includes(recipe.id) && // Not already favorite
        recipe.tags?.some(tag => favoriteTags.includes(tag)) // Has matching tag
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    
    return { recommendations: recommended }
  }),
  
  // Initialize with some mock data for testing
  initMockData: () => set({
    recipes: [
      {
        id: 1,
        title: "Vegetable Pasta",
        description: "Healthy pasta with fresh vegetables",
        tags: ["vegetarian", "pasta", "quick"],
        rating: 4
      },
      {
        id: 2,
        title: "Chicken Curry",
        description: "Spicy Indian chicken curry",
        tags: ["meat", "spicy", "indian"],
        rating: 5
      },
      // Add more sample recipes...
    ]
  })
}))

export default useRecipeStore
