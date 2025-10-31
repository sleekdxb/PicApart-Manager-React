import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./lib/pages/Dashboard";
import DealerManagement from "./lib/pages/DealerManagement";
import TopDealers from "./lib/pages/TopDealers";
import AccountOwner from "./lib/pages/AccountOwner";
import GarageManagement from "./lib/pages/GarageManagement";
import GarageProfile from "./lib/pages/GarageProfile";
import Subscriptions from "./lib/pages/Subscriptions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealer-management" element={<DealerManagement />} />
        <Route path="/garage-management" element={<GarageManagement/>} />
        <Route path="/subscriptions" element={<Subscriptions/>} />

        <Route path="/dealer-management/TopDealers" element={<TopDealers />} />
        <Route path="/dealer-management/AccountOwner" element={<AccountOwner />} />
        <Route path="/garage-management/GarageProfile" element={<GarageProfile />} />
        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

