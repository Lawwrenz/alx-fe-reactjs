import axios from "axios";

// GitHub API configuration
const BASE_URL = "https://api.github.com";
const API_TIMEOUT = 10000; // 10 seconds timeout

// Create axios instance with custom config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

/**
 * Performs an advanced search for GitHub users with error handling and rate limit awareness
 * @param {Object} criteria - Search criteria including username and optional filters
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} - Search results with user details
 * @throws {Error} - Specific error messages for different failure cases
 */
export const advancedSearchUsers = async (criteria, page = 1) => {
  try {
    // Validate input
    if (!criteria?.username?.trim()) {
      throw new Error("Username is required");
    }

    // Construct query string
    const queryParts = [
      `${criteria.username.trim()} in:login`,
      criteria.location && `location:${criteria.location}`,
      criteria.minRepos && `repos:>=${criteria.minRepos}`,
      criteria.language && `language:${criteria.language}`,
      criteria.followers && `followers:>=${criteria.followers}`,
    ].filter(Boolean);

    const query = queryParts.join(" ");

    // Initial search request
    const searchResponse = await api.get("/search/users", {
      params: {
        q: query,
        page,
        per_page: 30,
      },
    });

    // Check if results exist
    if (!searchResponse.data?.items?.length) {
      return { items: [], total_count: 0 };
    }

    // Fetch detailed information for each user
    const usersWithDetails = await Promise.all(
      searchResponse.data.items.map(async (user) => {
        try {
          const userResponse = await api.get(`/users/${user.login}`);
          return {
            ...user,
            ...userResponse.data,
          };
        } catch (error) {
          console.warn(`Failed to fetch details for ${user.login}:`, error);
          return user; // Return basic info if details fail
        }
      })
    );

    return {
      ...searchResponse.data,
      items: usersWithDetails,
    };
  } catch (error) {
    // Enhanced error handling
    let errorMessage = "Failed to search users";

    if (error.response) {
      // GitHub API error response
      if (error.response.status === 403) {
        errorMessage = "API rate limit exceeded. Please try again later.";
      } else if (error.response.status === 404) {
        errorMessage = "No users found matching your criteria";
      } else {
        errorMessage = `GitHub API error: ${
          error.response.data?.message || error.response.statusText
        }`;
      }
    } else if (error.request) {
      // No response received
      errorMessage = "Network error. Please check your connection.";
    }

    console.error("GitHub search error:", errorMessage, error);
    throw new Error(errorMessage);
  }
};

/**
 * Helper function to check rate limit status
 * @returns {Promise<Object>} Rate limit information
 */
export const checkRateLimit = async () => {
  try {
    const response = await api.get("/rate_limit");
    return response.data.resources.search;
  } catch (error) {
    console.error("Failed to check rate limit:", error);
    return null;
  }
};
