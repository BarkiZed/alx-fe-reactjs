import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const foundRecipe = recipeData.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!recipe) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        to="/" 
        className="inline-block mb-6 text-blue-500 hover:underline"
      >
        ← Back to Recipes
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span>{ingredient}</span>
                  </li>
                )) || (
                  <li className="text-gray-500">No ingredients listed</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions?.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                )) || (
                  <li className="text-gray-500">No instructions provided</li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
