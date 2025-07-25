import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import { Outlet, Router, Path, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Recipe Sharing App</h1>
      </header>
      <main>
        <AddRecipeForm />
        <Outlet />
        <RecipeList />
      </main>
    </div>
  );
}

export default App;