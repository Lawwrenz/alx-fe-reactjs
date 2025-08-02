import axios from "axios";

const BASE_URL = "https://api.github.com";

export const advancedSearchUsers = async (criteria, page = 1) => {
  try {
    // Construct query string based on criteria
    let query = `${criteria.username} in:login`;

    if (criteria.location) query += ` location:${criteria.location}`;
    if (criteria.minRepos) query += ` repos:>=${criteria.minRepos}`;
    if (criteria.language) query += ` language:${criteria.language}`;
    if (criteria.followers) query += ` followers:>=${criteria.followers}`;

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query,
        page: page,
        per_page: 30,
      },
    });

    // Fetch additional details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await axios.get(`${BASE_URL}/users/${user.login}`);
        return {
          ...user,
          ...userDetails.data,
        };
      })
    );

    return {
      ...response.data,
      items: usersWithDetails,
    };
  } catch (error) {
    console.error("Advanced search error:", error);
    throw error;
  }
};
