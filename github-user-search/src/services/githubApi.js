import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com'

export const searchUsers = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/search/users?q=${username}`)
    return response.data.items
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}
