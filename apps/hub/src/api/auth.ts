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