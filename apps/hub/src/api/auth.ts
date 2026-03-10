import api from "./axios";

export const logout = async () => {
  try {
    await api.post("/logout", null, {
      withCredentials: true,
    });
  } catch (err: any) {
    console.error("Logout failed", err.response?.data || err);
  }
};