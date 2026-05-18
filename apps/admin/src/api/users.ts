import { daiaApi } from "./axios";

export interface UserRole {
  context: string;
  role: string;
}

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string | null;
  daia_member_id: number | null;
  profile_picture_url: string | null;
  is_admin: boolean;
  is_active: boolean;
  is_verified: boolean;
  roles: UserRole[];
}

export const getUsers = async (search?: string): Promise<AdminUser[]> => {
  const params = search ? { search } : {};
  const res = await daiaApi.get("/users/", { params });
  return res.data;
};

export const assignRole = async (
  userId: string,
  context: string,
  role: string
): Promise<UserRole> => {
  const res = await daiaApi.post(`/users/${userId}/roles`, { context, role });
  return res.data;
};

export const removeRole = async (
  userId: string,
  context: string,
  role: string
): Promise<void> => {
  await daiaApi.delete(`/users/${userId}/roles`, { data: { context, role } });
};

export const syncUserToAcademy = async (userId: string): Promise<{ message: string }> => {
  const res = await daiaApi.post(`/users/${userId}/sync-academy`);
  return res.data;
};
