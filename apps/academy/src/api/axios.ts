import axios from "axios";
const DAIA_ACADEMY_API = import.meta.env.VITE_DAIA_ACADEMY_API;
const DAIA_API_URL = import.meta.env.VITE_DAIA_API;

export const academyAPI = axios.create({
  baseURL: DAIA_ACADEMY_API,
  withCredentials: true, // ✅ send cookies with every request
});

export const daiaAPI = axios.create({
  baseURL: DAIA_API_URL,
  withCredentials: true, // ✅ send cookies with every request
});