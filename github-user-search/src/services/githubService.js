import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

export const searchUsers = async (query, options = {}) => {
  try {
    const params = new URLSearchParams({ q: query });
    if (options.location) params.append('location', options.location);
    if (options.minRepos) params.append('repos', `>${options.minRepos}`);
    
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params,
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Get detailed info for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(`${BASE_URL}/users/${user.login}`);
        return {
          ...user,
          ...userDetails.data
        };
      })
    );
    
    return usersWithDetails;
  } catch (error) {
    console.error('GitHub API error:', error);
    throw new Error('Failed to search users');
  }
};
