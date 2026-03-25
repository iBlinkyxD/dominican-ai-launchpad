import {daiaAPI, academyAPI} from "./axios";

export const getMe = async () => {
  try {
    const res = await academyAPI.get("/users/me", {
      withCredentials: true,
    });

    return res.data; // ✅ user object directly
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to get user");
  }
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await daiaAPI.post(`/users/me/avatar`, formData);

    return res.data.avatar_url;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Avatar upload failed");
  }
};

export const updateProfile = async (data: {
  first_name?: string;
  last_name?: string;
  phone?: string;
}) => {
  const res = await daiaAPI.put("/users/me", data);

  return res.data;
};

export const updatePassword = async (data: {
  current_password: string;
  new_password: string;
}) => {
  const res = await daiaAPI.post("/users/change-password", data);

  return res.data
}