import SearchUser from './components/SearchUser';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">GitHub User Search</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <SearchUser />
      </main>
    </div>
  );
}

export default App;