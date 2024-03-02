import axios from "axios";

const apiBaseUrl = "https://attendance-api-nhsi.onrender.com"; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
      // Modify the request config if needed (e.g., add headers)
      return config;
    },
    error => {
      // Handle request error
      return Promise.reject(error);
    }
  );

export default axiosInstance