import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filters: {
    ingredients: [],
    maxTime: null,
    minRating: null
  },
  
  // Recipe CRUD operations
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe]
  })),
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter operations
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilter: (filterName, value) => set((state) => ({
    filters: { ...state.filters, [filterName]: value }
  })),
  
  // Computed filtered recipes
  getFilteredRecipes: () => {
    const { recipes, searchTerm, filters } = get()
    return recipes.filter(recipe => {
      // Search term matching
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Additional filters
      const matchesIngredients = filters.ingredients.length === 0 ||
        filters.ingredients.every(ing => 
          recipe.ingredients?.includes(ing))
      
      const matchesTime = !filters.maxTime || 
        (recipe.cookingTime && recipe.cookingTime <= filters.maxTime)
      
      const matchesRating = !filters.minRating || 
        (recipe.rating && recipe.rating >= filters.minRating)
      
      return matchesSearch && matchesIngredients && matchesTime && matchesRating
    })
  }
}))

export default useRecipeStore
