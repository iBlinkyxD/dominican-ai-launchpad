import api from "./axios";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export const register = async (data: RegisterPayload) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const response = await api.post("/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true, // ✅ this is the key change
  });

  return response.data;
};

export const verifyAccount = async (email: string, code: string) => {
  try {
    const res = await api.post(
      `/verify-email?email=${email}&code=${code}`
    );

    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Verification failed");
  }
};

export const resendVerification = async (email: string) => {
  try {
    const res = await api.post(
      `/resend-verification?email=${encodeURIComponent(email)}`
    );

    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.detail || "Failed to resend verification email"
    );
  }
};

export const getMe = async () => {
  try {
    const res = await api.get("/users/me"); // cookie sent automatically
    return res.data.user; // returns the user object
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Failed to get user");
  }
};