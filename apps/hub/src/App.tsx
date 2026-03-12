import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "../../../packages/src/auth"; 
import HubLayout from "./layouts/HubLayout";
import Overview from "./pages/Overview";
import AllApps from "./pages/AllApps";
import Security from "./pages/Security";
import Devices from "./pages/Devices";
import Settings from "./pages/Settings";
import Access from "./pages/Access";
import Academy from "./pages/Academy";
import AppLayout from "./layouts/Layout";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="apps" element={<AllApps />} />
          <Route path="security" element={<Security />} />
          <Route path="devices" element={<Devices />} />
          <Route path="settings" element={<Settings />} />
          <Route path="access" element={<Access />} />
          <Route path="academy" element={<Academy />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);


export default App;
