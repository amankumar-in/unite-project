// src/lib/api/api-config.ts

/**
 * API Configuration for connecting to Strapi backend
 */

// Define the environment-specific API URL
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Helper function to build complete API URLs
export const getStrapiURL = (path = "") => {
  return `${API_URL}${path}`;
};

// Function to get API response with error handling
export async function fetchAPI(path: string, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = getStrapiURL(`/api${path}`);
  console.log("Fetching from URL:", requestUrl);

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        "API response not OK:",
        response.status,
        response.statusText
      );
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error;
  }
}
