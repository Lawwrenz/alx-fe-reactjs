import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';

export default function Search() {
  const [searchData, setSearchData] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    followers: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchData.username.trim()) return;
    
    setLoading(true);
    setError(null);
    setUsers([]);
    setPage(1);
    
    try {
      const data = await advancedSearchUsers(searchData, 1);
      setUsers(data.items || []);
    } catch (err) {
      setError("Looks like we can't find users matching these criteria");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await advancedSearchUsers(searchData, nextPage);
      setUsers(prev => [...prev, ...(data.items || [])]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-gh-dark to-[#2b3137] text-white py-6 px-6 rounded-lg shadow-gh-sm mb-8 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-center">GitHub User Search</h1>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gh-blue to-gh-green"></div>
      </header>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-gh-sm mb-8 border border-gh-light-gray">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gh-dark mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={searchData.username}
            onChange={handleChange}
            placeholder="e.g. Lawrence"
            className="w-full px-4 py-2 border border-gh-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-gh-blue focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gh-dark mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco"
              className="w-full px-4 py-2 border border-gh-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-gh-blue focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gh-dark mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchData.minRepos}
              onChange={handleChange}
              placeholder="e.g. 10"
              min="0"
              className="w-full px-4 py-2 border border-gh-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-gh-blue focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gh-dark mb-1">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={searchData.language}
              onChange={handleChange}
              placeholder="e.g. JavaScript"
              className="w-full px-4 py-2 border border-gh-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-gh-blue focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="followers" className="block text-sm font-medium text-gh-dark mb-1">
              Min Followers
            </label>
            <input
              type="number"
              id="followers"
              name="followers"
              value={searchData.followers}
              onChange={handleChange}
              placeholder="e.g. 100"
              min="0"
              className="w-full px-4 py-2 border border-gh-light-gray rounded-md focus:outline-none focus:ring-2 focus:ring-gh-blue focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gh-blue hover:bg-gh-light-blue text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-gh-md disabled:bg-gh-light-gray disabled:text-gh-gray disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="spinner inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Searching...
            </>
          ) : (
            'Search Users'
          )}
        </button>
      </form>

      {/* Status Messages */}
      {loading && !users.length && (
        <div className="bg-blue-50 text-gh-blue p-6 rounded-lg mb-8 fade-in flex items-center justify-center gap-2">
          <span className="spinner inline-block w-5 h-5 border-2 border-gh-blue border-t-transparent rounded-full"></span>
          Loading...
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-gh-red p-6 rounded-lg mb-8 fade-in border-l-4 border-gh-red">
          {error}
        </div>
      )}

      {/* Results */}
      {users.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg text-gh-gray font-medium">{users.length} users found</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-gh-sm border border-gh-light-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-gh-md hover:border-gh-blue">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={user.avatar_url} 
                    alt={user.login} 
                    className="w-16 h-16 rounded-full border-2 border-gh-lighter-gray shadow-sm"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gh-dark">{user.login}</h3>
                    {user.location && (
                      <p className="text-gh-gray text-sm flex items-center gap-1 mt-1">
                        <span>📍</span> {user.location}
                      </p>
                    )}
                  </div>
                </div>
                
                {user.bio && (
                  <p className="text-gh-gray text-sm mb-4">{user.bio}</p>
                )}
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gh-lighter-gray p-3 rounded-md hover:bg-gh-light-gray transition-colors">
                    <p className="text-xs text-gh-gray font-medium">Repositories</p>
                    <p className="text-lg font-bold">{user.public_repos || 'N/A'}</p>
                  </div>
                  <div className="bg-gh-lighter-gray p-3 rounded-md hover:bg-gh-light-gray transition-colors">
                    <p className="text-xs text-gh-gray font-medium">Followers</p>
                    <p className="text-lg font-bold">{user.followers || 'N/A'}</p>
                  </div>
                </div>
                
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gh-dark hover:bg-gh-blue text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-gh-sm flex items-center justify-center gap-2"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>

          {users.length >= 30 && (
            <button 
              onClick={loadMore}
              disabled={loading}
              className="w-full bg-white hover:bg-gh-lighter-gray border border-gh-light-gray text-gh-blue font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-gh-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}