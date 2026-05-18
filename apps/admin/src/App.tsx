import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@packages/auth";
import AdminRoute from "./components/AdminRoute";
import AppLayout from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { NewCourse } from "./pages/NewCourse";
import { Packages } from "./pages/Packages";
import { Users } from "./pages/Users";
import { Tutoring } from "./pages/Tutoring";
import { TutoringWaitlist } from "./pages/TutoringWaitlist";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <AdminRoute>
                <AppLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="academy/courses" element={<Courses />} />
            <Route path="academy/courses/new" element={<NewCourse />} />
            <Route path="academy/packages" element={<Packages />} />
            <Route path="users" element={<Users />} />
            <Route path="tutoring" element={<Tutoring />} />
            <Route path="tutoring/waitlist" element={<TutoringWaitlist />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
