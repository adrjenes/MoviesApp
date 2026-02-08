import axios from "axios";

const API_URL = "https://localhost:7026";

export const http = axios.create({
  baseURL: API_URL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});