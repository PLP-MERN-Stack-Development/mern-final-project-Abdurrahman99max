// Client/src/services/apiClient.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("mb_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiClient = {
  get: (url, config) => client.get(url, config),
  post: (url, data, config) => client.post(url, data, config),
  put: (url, data, config) => client.put(url, data, config),
  patch: (url, data, config) => client.patch(url, data, config),
  delete: (url, config) => client.delete(url, config),

  // AUTH
  login: (credentials) => client.post("/auth/login", credentials).then((r) => r.data),
  register: (payload) => client.post("/auth/register", payload).then((r) => r.data),
  me: () => client.get("/auth/me").then((r) => r.data),

  // METRICS  ✅
  getDashboardMetrics: () =>
    client.get("/metrics/overview").then((r) => r.data),
};

export default apiClient;
