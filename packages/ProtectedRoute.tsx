import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {getMe} from "../apps/landing/src/api/auth"; // your getMe function

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe(); // cookie is sent automatically
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    window.location.href = "http://localhost:8080/login"; // redirect to Landing login
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;