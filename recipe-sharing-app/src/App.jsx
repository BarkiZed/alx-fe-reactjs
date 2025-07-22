import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import AdvancedFilters from './components/AdvancedFilters'

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Recipe</Link>
        </nav>
        
        <h1>Recipe Sharing App</h1>
        
        <Routes>
          <Route path="/" element={
            <>
              <div className="search-section">
                <SearchBar />
                <AdvancedFilters />
              </div>
              <RecipeList />
            </>
          } />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipeForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
