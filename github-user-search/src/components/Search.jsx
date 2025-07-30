import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]); // Changed to array for multiple users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchUserData(username);
      setUsers([data]); // Wrap in array to use map() later
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {/* Added map() to display users */}
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar_url} alt="User avatar" width="100" />
          <h2>{user.login}</h2>
          {user.name && <p>{user.name}</p>}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      ))}
    </div>
  );
};

export default Search;
