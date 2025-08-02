import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';
import '../App.css';

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
    <div className="search-container">
      <form onSubmit={handleSubmit} className="advanced-search-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={searchData.username}
            onChange={handleChange}
            placeholder="e.g. torvalds"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco"
            />
          </div>

          <div className="form-group">
            <label htmlFor="minRepos">Min Repositories</label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchData.minRepos}
              onChange={handleChange}
              placeholder="e.g. 10"
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              value={searchData.language}
              onChange={handleChange}
              placeholder="e.g. JavaScript"
            />
          </div>

          <div className="form-group">
            <label htmlFor="followers">Min Followers</label>
            <input
              type="number"
              id="followers"
              name="followers"
              value={searchData.followers}
              onChange={handleChange}
              placeholder="e.g. 100"
              min="0"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </form>

      {loading && !users.length && (
        <div className="status-message loading">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="status-message error">
          <p>{error}</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="results-container">
          <h3 className="results-count">{users.length} users found</h3>
          
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <img 
                    src={user.avatar_url} 
                    alt={user.login} 
                    className="user-avatar"
                  />
                  <div>
                    <h3 className="user-name">{user.login}</h3>
                    {user.location && (
                      <p className="user-meta">
                        <span className="meta-icon">📍</span> {user.location}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-icon">📊</span>
                    <div>
                      <p className="stat-label">Repositories</p>
                      <p className="stat-value">{user.public_repos || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">👥</span>
                    <div>
                      <p className="stat-label">Followers</p>
                      <p className="stat-value">{user.followers || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
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
              className="load-more"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}