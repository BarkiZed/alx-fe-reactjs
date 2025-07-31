import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchUsers(searchParams);
      setUsers(results);
    } catch (err) {
      setError('Looks like we cant find matching users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="username"
          value={searchParams.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="minRepos"
          value={searchParams.minRepos}
          onChange={handleInputChange}
          placeholder="Min Repositories"
          min="0"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <div className="user-info">
              <h3>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  {user.login}
                </a>
              </h3>
              {user.name && <p>Name: {user.name}</p>}
              {user.location && <p>📍 {user.location}</p>}
              {user.public_repos !== undefined && (
                <p>Repositories: {user.public_repos}</p>
              )}
              {user.bio && <p className="bio">{user.bio}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
