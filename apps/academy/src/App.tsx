import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "../types";
import { api } from "../mockData";
import { AuthProvider, ProtectedRoute } from "../../../packages/src/auth";
import { AppLayout } from "./components/Layout";
import { Home, AdminDashboard } from "./pages/Dashboard";
import { SpacesList, SpaceDetail } from "./pages/Spaces";
import { Learn, CourseDetail, LessonPlayer } from "./pages/Education";
import { Messages, Profile } from "./pages/Social";
import { MembersDirectory } from "./pages/Members";
import { Announcements } from "./pages/Announcements";
import { Login, Onboarding } from "./pages/Onboarding";
import { AIChat } from "./pages/AIChat";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoute>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spaces" element={<SpacesList />} />
              <Route path="/spaces/:id" element={<SpaceDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:courseId" element={<CourseDetail />} />
              <Route
                path="/learn/:courseId/lesson/:lessonId"
                element={<LessonPlayer />}
              />
              <Route path="/chat-daia" element={<AIChat />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/members" element={<MembersDirectory />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </ProtectedRoute>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
