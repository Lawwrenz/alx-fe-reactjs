import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import '../App.css';

export default function SearchUser() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we can\'t find the user');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="search-button"
        >
          Search
        </button>
      </form>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {userData && (
        <div className="user-card">
          <div className="user-header">
            <img 
              src={userData.avatar_url} 
              alt={userData.login} 
              className="user-avatar"
            />
            <div>
              <h2 className="user-name">{userData.name || userData.login}</h2>
              {userData.bio && <p className="user-bio">{userData.bio}</p>}
            </div>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <p className="stat-label">Followers</p>
              <p className="stat-value">{userData.followers}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Following</p>
              <p className="stat-value">{userData.following}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Repositories</p>
              <p className="stat-value">{userData.public_repos}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Location</p>
              <p className="stat-value">{userData.location || 'Not specified'}</p>
            </div>
          </div>
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="profile-link"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}