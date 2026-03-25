import api from "./axios";
import { authService } from "../auth/authService";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const response = await api.post("/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });

  if (response.data.access_token) {
    authService.setToken(response.data.access_token);
  }

  return response.data;
};

export const getMe = async () => {
  try {
    const res = await api.get("/users/me", {
      withCredentials: true,
    });

    return res.data; // ✅ user object directly
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to get user");
  }
};

export const logout = async () => {
  try {
    await api.post("/logout", null, {
      withCredentials: true,
    });
  } catch (err: any) {
    console.error("Logout failed", err.response?.data || err);
  } finally {
    authService.removeToken();
  }
};
