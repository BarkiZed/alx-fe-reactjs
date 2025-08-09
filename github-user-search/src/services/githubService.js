import axios from 'axios';

const GITHUB_API_URL = "https://api.github.com/search/users?q";

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

export const searchUsers = async (queryParams) => {
  try {
    // Construct query string from parameters
    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value) // Remove empty params
      .map(([key, value]) => {
        if (key === 'username') return value;
        if (key === 'minRepos') return `repos:>${value}`;
        return `${key}:${value}`;
      })
      .join('+');

    // Make API request with the constructed query
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(queryString)}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    // Get detailed information for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(
          `${GITHUB_API_URL}/users/${user.login}`
        );
        return {
          ...user,
          ...userDetails.data,
        };
      })
    );

    return usersWithDetails;
  } catch (error) {
    console.error('GitHub API error:', error);
    throw new Error('Failed to search users');
  }
};

// Example usage:
// searchUsers({
//   username: 'john',
//   location: 'new york',
//   minRepos: 5
// })
