import { createContext, useContext, useState, useEffect } from "react";
import { User } from "./authService";
import { getMe } from "../apps/landing/src/api/auth"; // your getMe function
import { logout as apiLogout } from "../apps/hub/src/api/auth";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean; // add this
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe(); // cookie-based fetch
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (user: User) => setUser(user);

  const logout = async () => {
    try {
      await apiLogout(); // call backend to clear cookie
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      setUser(null); // clear local user state
      window.location.href = `${import.meta.env.VITE_LANDING_URL}/login`; // redirect to login
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
