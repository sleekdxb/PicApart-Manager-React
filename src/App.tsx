import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./lib/pages/main_dashboard/Dashboard";
import DealerManagement from "./lib/pages/dealer_management/DealerManagement";
import TopDealers from "./lib/pages/dealer_management/TopDealers";
import AccountOwner from "./lib/pages/dealer_management/AccountOwner";
import GarageManagement from "./lib/pages/garage_management/GarageManagement";
import GarageProfile from "./lib/pages/garage_management/GarageProfile";
import Subscriptions from "./lib/pages/subscriptions_dashboard/Subscriptions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealer-management" element={<DealerManagement />} />
        <Route path="/garage-management" element={<GarageManagement />} />
        <Route path="/subscriptions" element={<Subscriptions />} />

        <Route path="/dealer-management/TopDealers" element={<TopDealers />} />
        <Route
          path="/dealer-management/AccountOwner"
          element={<AccountOwner />}
        />
        <Route
          path="/garage-management/GarageProfile"
          element={<GarageProfile />}
        />
        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
