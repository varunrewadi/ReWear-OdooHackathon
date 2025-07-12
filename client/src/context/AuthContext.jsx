import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";
import toast from "react-hot-toast";

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Always try to get current user on app load
        // This will work if there are valid cookies
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        } else {
          setUser(null); // Explicitly set to null if no user
        }
      } catch (error) {
        // If there's an actual error, user remains null
        console.error("Auth initialization error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      toast.success("Login successful!");
      return response;
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser({
        userID: response.userID,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
      });
      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      return updatedUser;
    } catch (error) {
      toast.error(error.message || "Profile update failed");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
