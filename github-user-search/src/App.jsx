import SearchUser from './components/Search';
import Search from './components/Search'
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">GitHub User Search</h1>
      </header>
      <main>
        <SearchUser />
      </main>
    </div>
  );
}

export default App;