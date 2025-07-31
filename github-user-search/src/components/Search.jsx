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
    // Properly using target.value here
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchUsers({
        username: searchParams.username,
        location: searchParams.location,
        minRepos: searchParams.minRepos
      });
      setUsers(results);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={searchParams.username}
          onChange={handleInputChange}  // Using handler with target.value
          placeholder="Enter GitHub username"
        />
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleInputChange}  // Using handler with target.value
          placeholder="Filter by location"
        />
        <input
          type="number"
          name="minRepos"
          value={searchParams.minRepos}
          onChange={handleInputChange}  // Using handler with target.value
          placeholder="Minimum repositories"
          min="0"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

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
