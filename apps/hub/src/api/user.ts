import api from "./axios";

export const uploadAvatar = async (userId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post(`/users/me/avatar`, formData);

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
  const res = await api.put("/users/me", data);

  return res.data;
};

export const updatePassword = async (data: {
  current_password: string;
  new_password: string;
}) => {
  const res = await api.post("/users/change-password", data);

  return res.data
}