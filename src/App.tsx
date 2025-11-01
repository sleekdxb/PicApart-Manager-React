import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./lib/pages/auth/Login";
import Dashboard from "./lib/pages/main_dashboard/Dashboard";
import DealerManagement from "./lib/pages/dealer_managment/DealerManagement";
import TopDealers from "./lib/pages/dealer_managment/TopDealers";
import AccountOwner from "./lib/pages/dealer_managment/AccountOwner";
import GarageManagement from "./lib/pages/garage_managment/GarageManagement";
import GarageProfile from "./lib/pages/garage_managment/GarageProfile";
import Subscriptions from "./lib/pages/subscription/Subscriptions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealer-management" element={<DealerManagement />} />
        <Route path="/garage-management" element={<GarageManagement />} />
        <Route path="/subscriptions" element={<Subscriptions />} />

        <Route path="/dealer-management/TopDealers" element={<TopDealers />} />
        <Route path="/dealer-management/AccountOwner" element={<AccountOwner />} />
        <Route path="/garage-management/GarageProfile" element={<GarageProfile />} />
        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

