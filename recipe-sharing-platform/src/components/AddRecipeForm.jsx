import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: [],
    steps: []
  });
  const [errors, setErrors] = useState({});
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentStep, setCurrentStep] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, currentIngredient.trim()]
      });
      setCurrentIngredient('');
      if (errors.ingredients) {
        setErrors({
          ...errors,
          ingredients: null
        });
      }
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  const addStep = () => {
    if (currentStep.trim()) {
      setFormData({
        ...formData,
        steps: [...formData.steps, currentStep.trim()]
      });
      setCurrentStep('');
      if (errors.steps) {
        setErrors({
          ...errors,
          steps: null
        });
      }
    }
  };

  const removeStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({
      ...formData,
      steps: newSteps
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (formData.ingredients.length < 2) newErrors.ingredients = 'Please add at least 2 ingredients';
    if (formData.steps.length < 1) newErrors.steps = 'Please add at least 1 preparation step';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would send this data to your backend API
      console.log('Form submitted:', {
        ...formData,
        ingredients: formData.ingredients.join('\n'),
        steps: formData.steps.join('\n')
      });
      alert('Recipe submitted successfully!');
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Spaghetti Carbonara"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Summary Field */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Short Summary *
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.summary ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="A brief description of your recipe..."
          />
          {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
        </div>

        {/* Image URL Field */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/recipe-image.jpg"
          />
        </div>

        {/* Ingredients Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients * (Add at least 2)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 2 cups flour"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          
          {formData.ingredients.length > 0 && (
            <ul className="mb-2 border rounded-md divide-y">
              {formData.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center px-4 py-2">
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preparation Steps * (Add at least 1)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentStep}
              onChange={(e) => setCurrentStep(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Mix all dry ingredients"
            />
            <button
              type="button"
              onClick={addStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          
          {formData.steps.length > 0 && (
            <ol className="mb-2 border rounded-md divide-y list-decimal list-inside">
              {formData.steps.map((step, index) => (
                <li key={index} className="flex justify-between items-center px-4 py-2">
                  <span>{step}</span>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ol>
          )}
          {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
