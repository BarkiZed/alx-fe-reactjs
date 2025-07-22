import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

  const handleSubmit = (event) => {
    event.preventDefault()  // This is the critical missing line
    updateRecipe({
      id: recipe.id,
      title: title.trim(),
      description: description.trim()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe description"
        required
      />
      <button type="submit">Update Recipe</button>
    </form>
  )
}

export default EditRecipeForm
