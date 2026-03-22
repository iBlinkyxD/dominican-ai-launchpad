import axios from "axios";
const API_URL = import.meta.env.VITE_DAIA_ACADEMY_API;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ send cookies with every request
});

export default api;