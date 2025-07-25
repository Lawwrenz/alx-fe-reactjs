import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import { Outlet, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Recipe Sharing App</h1>
      </header>
      <main>
        <div className="app-layout">
          <div className="form-section">
            <AddRecipeForm />
          </div>
          <div className="list-section">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;