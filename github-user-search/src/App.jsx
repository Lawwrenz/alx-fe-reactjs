import { useState } from 'react';
import { advancedSearchUsers } from './services/githubService';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = async (params) => {
    setLoading(true);
    setError('');
    setSearchParams(params);
    setPage(1);
    
    const { data, total, error } = await advancedSearchUsers(params, 1);
    setLoading(false);
    
    if (error) {
      setError(error);
      setUsers([]);
      setTotalResults(0);
    } else {
      setUsers(data);
      setTotalResults(total);
    }
  };

  const handleReset = () => {
    setUsers([]);
    setError('');
    setTotalResults(0);
    setPage(1);
    setSearchParams(null);
  };

  const loadMore = async () => {
    if (!searchParams) return;
    
    setLoading(true);
    const nextPage = page + 1;
    const { data, error } = await advancedSearchUsers(searchParams, nextPage);
    setLoading(false);
    
    if (error) {
      setError(error);
    } else {
      setUsers([...users, ...data]);
      setPage(nextPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>
        
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-600">Searching GitHub...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {users.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">
                {totalResults.toLocaleString()} results found
              </h2>
              {users.length < totalResults && (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {users.length < totalResults && !loading && (
              <div className="mt-6 text-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More ({totalResults - users.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;