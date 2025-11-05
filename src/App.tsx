import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./lib/pages/main_dashboard/Dashboard";
import Login from "./lib/pages/auth/Login";
import DealerManagement from "./lib/pages/dealer_managment/DealerManagement";
import TopDealers from "./lib/pages/dealer_managment/TopDealers";
import AccountOwner from "./lib/pages/dealer_managment/AccountOwner";
import GarageManagement from "./lib/pages/garage_managment/GarageManagement";
import GarageProfile from "./lib/pages/garage_managment/GarageProfile";
import AllGarages from "./lib/pages/garage_managment/AllGarages";
import Subscriptions from "./lib/pages/subscriptions_dashboard/Subscriptions";

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
        <Route path="/garage-management/AllGarages" element={<AllGarages />} />
        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
