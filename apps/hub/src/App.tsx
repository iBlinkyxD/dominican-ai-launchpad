import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "../../../packages/auth/src";
import HubLayout from "./layouts/HubLayout";
import Overview from "./pages/Overview";
import AllApps from "./pages/AllApps";
import Security from "./pages/Security";
import Devices from "./pages/Devices";
import Settings from "./pages/Settings";
import Access from "./pages/Access";

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubLayout />}>
          <Route index element={<Overview />} />
          <Route path="apps" element={<AllApps />} />
          <Route path="security" element={<Security />} />
          <Route path="devices" element={<Devices />} />
          <Route path="settings" element={<Settings />} />
          <Route path="access" element={<Access />} />
        </Route>
      </Routes>
    </BrowserRouter>
);

export default App;
