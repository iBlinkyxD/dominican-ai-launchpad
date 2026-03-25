import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "../../../packages/src/auth";
import AppLayout from "./components/Layout";
import { Home, AdminDashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { CourseContent } from "./pages/CourseContent";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { MembersDirectory } from "./pages/Members";
import { Announcements } from "./pages/Announcements";
import { AIChat } from "./pages/AIChat";
import { SettingsMenuProvider } from "../../../packages/src/SettingsMenuContext";
import { BadgesPage } from "./pages/Badges";
import { CourseDetail } from "./pages/CourseDetail";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsMenuProvider>
          <Routes>

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="profile/:username" element={<Profile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/package/:slug" element={<CourseDetail type="package" />} />
              <Route path="courses/:slug" element={<CourseDetail type="course" />} />
              <Route path="courses/:courseId/lesson/:lessonId" element={<CourseContent />} />
              <Route path="badges-certificates" element={<BadgesPage />} />
              <Route path="chat-daia" element={<AIChat />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="members" element={<MembersDirectory />} />
              <Route path="messages" element={<Messages />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SettingsMenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;