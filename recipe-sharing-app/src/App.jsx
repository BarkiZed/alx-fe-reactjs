import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import { useEffect } from 'react'
import useRecipeStore from './store/recipeStore'

function App() {
  const initMockData = useRecipeStore(state => state.initMockData)

  useEffect(() => {
    initMockData()
  }, [initMockData])

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/add">Add Recipe</Link>
        </nav>
        
        <h1>Recipe Sharing App</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <RecommendationsList />
              <RecipeList />
            </>
          } />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipeForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
