import axios from "axios";

// Define BASE URLs for different environments
const BASE_URLS = {
  development: "http://localhost:8800",
  production: "https://food-truck-mern.onrender.com"
};

// Automatically pick the base URL based on the current environment
const BASE_URL =
  "production" === "production" ? BASE_URLS.production : BASE_URLS.development;
// const BASE_URL = BASE_URLS.production;

// Global Axios configuration
axios.defaults.withCredentials = true; // Always include credentials (cookies) in requests
axios.defaults.baseURL = BASE_URL; // Set base URL globally

// Function to make API requests
// apiService.jsx
const makeRequest = async (
  endPoint = "/",
  method = "GET",
  data = null,
  config = {},
  token = null
) => {
  try {
    const headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : ""
    };
console.log(token)
    const response = await axios({
      url: endPoint,
      method,
      data,
      timeout: 120000,
      headers,
      ...config
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Unknown error occurred";
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export { makeRequest };
