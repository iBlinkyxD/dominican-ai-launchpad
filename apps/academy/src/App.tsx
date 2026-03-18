import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "../types";
import { api } from "../mockData";
import { AuthProvider, ProtectedRoute } from "../../../packages/src/auth";
import AppLayout from "./components/Layout";
import { Home, AdminDashboard } from "./pages/Dashboard";
import { SpacesList, SpaceDetail } from "./pages/Spaces";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { LessonPlayer } from "./pages/LessonPlayer";
import { Messages, Profile } from "./pages/Social";
import { MembersDirectory } from "./pages/Members";
import { Announcements } from "./pages/Announcements";
import { Login, Onboarding } from "./pages/Onboarding";
import { AIChat } from "./pages/AIChat";
import { SettingsMenuProvider } from "../../../packages/src/SettingsMenuContext";

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
              <Route path="spaces" element={<SpacesList />} />
              <Route path="spaces/:id" element={<SpaceDetail />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route
                path="courses/:courseId/lesson/:lessonId"
                element={<LessonPlayer />}
              />
              <Route path="chat-daia" element={<AIChat />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="members" element={<MembersDirectory />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<AdminDashboard />} />
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
