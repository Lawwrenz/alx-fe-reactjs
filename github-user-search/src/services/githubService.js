import axios from "axios";

const API_URL =
  import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com";

const buildQueryString = (params) => {
  let query = params.username ? `${params.username} in:login` : "";
  if (params.location) query += ` location:${params.location}`;
  if (params.minRepos) query += ` repos:>${params.minRepos}`;
  if (params.language) query += ` language:${params.language}`;
  return query.trim();
};

export const advancedSearchUsers = async (params, page = 1, perPage = 10) => {
  try {
    const query = buildQueryString(params);
    if (!query) {
      return {
        data: [],
        total: 0,
        error: "Please enter at least one search criteria",
      };
    }

    const response = await axios.get(`${API_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });

    // Fetch additional details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userResponse = await axios.get(
            `${API_URL}/users/${user.login}`
          );
          return userResponse.data;
        } catch (error) {
          return {
            ...user,
            error: "Could not fetch additional details",
          };
        }
      })
    );

    return {
      data: usersWithDetails,
      total: response.data.total_count,
      error: null,
    };
  } catch (error) {
    if (error.response?.status === 403) {
      return {
        data: [],
        total: 0,
        error: "API rate limit exceeded. Please try again later.",
      };
    }
    return {
      data: [],
      total: 0,
      error: error.message || "An error occurred while searching",
    };
  }
};

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
