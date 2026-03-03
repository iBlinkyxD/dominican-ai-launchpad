import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();

if (!user) {
  return <Navigate to="http://localhost:8080/login" replace />
}
  return children;
};