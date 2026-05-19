import { createContext, useContext, useState, useEffect } from "react";
import { User } from "./authService";
import { getMe, logout as apiLogout } from "../api/auth";

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
      setUser(null);
      setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_LANDING_URL}/login?logout=true`;
      }, 1500);
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
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

export const useRole = (context: string) => {
  const { user } = useAuth();

  const hasRole = (role: string): boolean =>
    user?.roles?.some(r => r.context === context && r.role === role) ?? false;

  const hasAnyRole = (...roles: string[]): boolean =>
    roles.some(role => hasRole(role));

  return { hasRole, hasAnyRole };
};
