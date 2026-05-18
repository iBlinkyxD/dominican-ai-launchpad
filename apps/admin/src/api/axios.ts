import axios from "axios";

export const academyApi = axios.create({
  baseURL: import.meta.env.VITE_DAIA_ACADEMY_API,
  withCredentials: true,
});

export const daiaApi = axios.create({
  baseURL: import.meta.env.VITE_DAIA_API,
  withCredentials: true,
});
