// Client/src/hooks/useAuth.js
import React, { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useToast } from "../context/ToastContext.jsx";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("mb_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Auth /me failed:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("mb_token");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const data = res.data;

      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      setUser(data.user || null);
      setToken(data.token);
      localStorage.setItem("mb_token", data.token);
      addToast("Logged in successfully", "success");
    } catch (err) {
      console.error("Login error:", err);
      addToast(
        err.response?.data?.message || "Login failed. Check your credentials.",
        "error"
      );
      throw err; // let LoginForm handle navigation logic
    }
  };

  const register = async (payload) => {
    try {
      const res = await apiClient.post("/auth/register", payload);
      const data = res.data;

      if (!data || !data.token) {
        throw new Error("Invalid register response");
      }

      setUser(data.user || null);
      setToken(data.token);
      localStorage.setItem("mb_token", data.token);
      addToast("Account created successfully", "success");
    } catch (err) {
      console.error("Register error:", err);
      addToast(
        err.response?.data?.message ||
          "Registration failed. Please check your details.",
        "error"
      );
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mb_token");
    addToast("Logged out", "success");
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
