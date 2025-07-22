import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'

const AdvancedFilters = () => {
  const [ingredientInput, setIngredientInput] = useState('')
  const setFilter = useRecipeStore(state => state.setFilter)
  const filters = useRecipeStore(state => state.filters)

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFilter('ingredients', [...filters.ingredients, ingredientInput.trim()])
      setIngredientInput('')
    }
  }

  return (
    <div className="advanced-filters">
      <div className="filter-group">
        <h4>Ingredients</h4>
        <div className="ingredient-input">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Add ingredient filter"
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        {filters.ingredients.length > 0 && (
          <div className="ingredient-tags">
            {filters.ingredients.map((ing, index) => (
              <span key={index} className="tag">
                {ing}
                <button 
                  onClick={() => setFilter('ingredients', 
                    filters.ingredients.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="filter-group">
        <h4>Max Cooking Time (mins)</h4>
        <input
          type="number"
          value={filters.maxTime || ''}
          onChange={(e) => setFilter('maxTime', e.target.value ? Number(e.target.value) : null)}
          placeholder="No limit"
        />
      </div>

      <div className="filter-group">
        <h4>Minimum Rating</h4>
        <select
          value={filters.minRating || ''}
          onChange={(e) => setFilter('minRating', e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Any rating</option>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}+ stars</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default AdvancedFilters
