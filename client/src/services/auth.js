import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5500/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with requests when withCredentials is true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !["/login", "/register"].includes(window.location.pathname)
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/signin", { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async register(userData) {
    try {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get("/user/check");
      // The new endpoint returns { user: userData, authenticated: boolean }
      if (response.data.authenticated && response.data.user) {
        return response.data.user;
      }
      return null; // No authenticated user
    } catch (error) {
      // Don't log 401 errors as they're expected for non-authenticated users
      if (error.response?.status !== 401) {
        console.error("getCurrentUser error:", error.message);
      }
      return null; // Return null instead of throwing error
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put("/users/profile", profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  },

  async resetPassword(token, password) {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  },

  async verifyEmail(token) {
    try {
      const response = await api.post("/auth/verify-email", { token });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Email verification failed"
      );
    }
  },

  async logout() {
    try {
      const response = await api.post("/auth/signout");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },
};

export default api;
