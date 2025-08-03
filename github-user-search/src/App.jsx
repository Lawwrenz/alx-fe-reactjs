import { useState } from 'react';
import { fetchUserData } from './services/githubService';
import SearchBar from './components/SearchBar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    const { data, error } = await fetchUserData(username);
    setLoading(false);
    
    if (error) {
      setError(error);
      setUser(null);
    } else {
      setUser(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>
        <SearchBar onSearch={handleSearch} />
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-red-500">Looks like we can't find the user</p>
          </div>
        )}

        {user && !loading && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{user.name || user.login}</h2>
                <p className="text-gray-600">{user.login}</p>
                {user.bio && <p className="text-gray-500 mt-2">{user.bio}</p>}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View Profile
                </a>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              {user.followers && (
                <p>
                  <span className="font-semibold">{user.followers}</span> followers
                </p>
              )}
              {user.following && (
                <p>
                  <span className="font-semibold">{user.following}</span> following
                </p>
              )}
              {user.public_repos && (
                <p>
                  <span className="font-semibold">{user.public_repos}</span> repositories
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;