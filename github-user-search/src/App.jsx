import { useState } from 'react';
import { searchUsers } from './services/githubService';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    const results = await searchUsers(query);
    setUsers(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </div>
  );
}

export default App;