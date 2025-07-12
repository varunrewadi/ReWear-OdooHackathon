import api from "./auth.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5500/api";

export const itemsService = {
  async getAllItems(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.category && filters.category !== "all") {
        params.append("category", filters.category);
      }
      if (filters.type && filters.type !== "all") {
        params.append("type", filters.type);
      }
      if (filters.condition && filters.condition !== "all") {
        params.append("condition", filters.condition);
      }
      if (filters.search) {
        params.append("search", filters.search);
      }
      if (filters.sort) {
        params.append("sort", filters.sort);
      }
      if (filters.page) {
        params.append("page", filters.page);
      }
      if (filters.limit) {
        params.append("limit", filters.limit);
      }

      const response = await fetch(
        `${API_BASE_URL}/items?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

  async getItemById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch item");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  },

  async getItemsByCategory(category, limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/items/category/${category}?limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items by category");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching items by category:", error);
      throw error;
    }
  },
};

export default itemsService;
