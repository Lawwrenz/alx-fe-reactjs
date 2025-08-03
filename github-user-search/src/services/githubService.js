import axios from "axios";

const API_URL =
  import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        data: null,
        error: "User not found",
      };
    }
    return {
      data: null,
      error: "An error occurred while fetching user data",
    };
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search/users?q=${query}`);
    return {
      data: response.data.items,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "An error occurred while searching",
    };
  }
};
