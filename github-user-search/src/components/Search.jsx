import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'
  const [basicUsername, setBasicUsername] = useState('');
  const [advancedParams, setAdvancedParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!basicUsername) return;

    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUserData(basicUsername);
      setUsers([userData]); // Single user result as array
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchUsers(advancedParams);
      setUsers(results);
    } catch (err) {
      setError('Failed to search users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="search-container">
      <div className="search-type-toggle">
        <button 
          onClick={() => setSearchType('basic')}
          className={searchType === 'basic' ? 'active' : ''}
        >
          Basic Search
        </button>
        <button 
          onClick={() => setSearchType('advanced')}
          className={searchType === 'advanced' ? 'active' : ''}
        >
          Advanced Search
        </button>
      </div>

      {searchType === 'basic' ? (
        <form onSubmit={handleBasicSearch}>
          <input
            type="text"
            value={basicUsername}
            onChange={(e) => setBasicUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAdvancedSearch}>
          <input
            type="text"
            name="username"
            value={advancedParams.username}
            onChange={handleAdvancedInputChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="location"
            value={advancedParams.location}
            onChange={handleAdvancedInputChange}
            placeholder="Location"
          />
          <input
            type="number"
            name="minRepos"
            value={advancedParams.minRepos}
            onChange={handleAdvancedInputChange}
            placeholder="Min Repositories"
            min="0"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <div className="user-info">
              <h3>{user.login}</h3>
              {user.name && <p>{user.name}</p>}
              {user.location && <p>📍 {user.location}</p>}
              {user.public_repos && <p>Repositories: {user.public_repos}</p>}
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
