import axios from "axios";
const DAIA_ACADEMY_API = import.meta.env.VITE_DAIA_ACADEMY_API;
const DAIA_API_URL = import.meta.env.VITE_DAIA_API;

export const academyAPI = axios.create({
  baseURL: DAIA_ACADEMY_API,
  withCredentials: true,
});

academyAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const daiaAPI = axios.create({
  baseURL: DAIA_API_URL,
  withCredentials: true,
});