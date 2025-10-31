import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import liquidityscore from "../../assets/images/liquidityscore.png";
import arrowup from "../../assets/images/arrowup.png";
import currency from "../../assets/images/currency.png";
import activedealers from "../../assets/images/active_dealers.png";
import chartbar from "../../assets/images/chartbar.png";
import revenuerisk from "../../assets/images/revenue risk.png";
import failedpayment from "../../assets/images/failed_payment.png";
import subscription from "../../assets/images/subscription_ending.png";
import liquidity from "../../assets/images/liquidity.png";
import quickactions from "../../assets/images/quick_actions.png";
import approvedealers from "../../assets/images/UserSwitch.png";
import number from "../../assets/images/number.png";
import respondtickets from "../../assets/images/respond_tickets.png";
import viewalerts from "../../assets/images/view_alerts.png";
import generatereport from "../../assets/images/generate_report.png";

import EngagementFunnelChart from "../charts/EngagementFunnelChart";
import SubscriptionHealthChart from "../charts/SubscriptionHealthChart";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* === Sidebar === */}
      <Sidebar
        collapsed={collapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* === Navbar with Toggle Button === */}
      <DashboardNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} />

      {/* === Main Content === */}
      
         <main
        className={`p-6 mt-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* ===============four cards section ============== */}
        {/* ==== card 1 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="mt-3 border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <h3 className="text-sm font-semibold text-gray-600">Total Listings</h3>
          <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">87</h3>
        <span className="text-sm text-gray-700">/100</span>
      </div>
          <div className="bg-[#DBEAFE] p-2 rounded-md ">
          <img src={liquidityscore} alt="liquidity score" className="w-4 h-4" />
          </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-sm font-semibold text-gray-700 ">Auto Spare Parts vs Tyres </h2>
          </div>
         </div>

         {/* ==== card 2 ==== */}

      <div className="mt-3 border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">MRR</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-md font-bold text-black">AED24,589</h3>
      </div>
      <div className="bg-[#CAFFDC] p-2 rounded-md">
        <img src={currency} alt="currency" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2 justify-between">
      <h2 className="text-sm font-bold text-gray-700">Parts: $18,235</h2>
      <span className="text-sm text-gray-700">Tyres: $6,354</span>
      
    </div>
    {/*== progress bar below == */}
    <div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#E9E9E9] h-2 rounded-full"
  >   
  </div>
      </div>
  </div>
 
        {/* ======== card 3 ========== */}
    <div className="mt-3 border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Active Dealers</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">124</h3>
      </div>
      <div className="bg-[#F2E7FF] p-2 rounded-md">
        <img src={activedealers} alt="active dealers" className="w-5 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <img src={arrowup} alt="arrow up" className="w-4 h-4" />
      <h2 className="text-sm font-bold text-[#16A34A]">8.7% </h2>
      <span className="text-sm text-gray-700">MoM growth</span>
    </div>
  </div>

         {/* ====== card 4 ======= */}
     <div className="mt-3 border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">ARPPD</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">AED198.30</h3>
      </div>
      <div className="bg-[#FEF9C3] p-2 rounded-md">
        <img src={chartbar} alt="chartbar" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <img src={arrowup} alt="arrow up" className="w-4 h-4" />
      <h2 className="text-sm font-bold text-[#16A34A]">1.2% </h2>
      <span className="text-sm text-gray-700">vs last quarter</span>
    </div>
  </div>

  </div>
{/* === charts section ==========*/}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
    <div className=" mt-3 gap-3">
      <EngagementFunnelChart/>
      </div>
      <div className=" mt-3">
      <SubscriptionHealthChart/>
    </div>
   </div>

   {/* ============ three card section ============= */}
   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
    <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex  justify-between items-center">
        <h3 className="text-sm font-semibold text-black">Revenue Risk Alerts</h3>
        <img src={revenuerisk} alt="revenue risk" className="w-5 h-5" />
      </div>

      {/* == failed payments == */}
      <div className="flex items-center gap-3 mt-4 ">
        <div className="p-2 bg-[#FEE2E2]">
        <img src={failedpayment} alt="failed payment" className="w-5 h-5"/>
        </div>
        <div className="flex-col items-center">
          <h3 className="text-sm text-black font-bold">Failed payments 2 attempts</h3>
          <h3 className="text-sm text-gray-700">3 dealers with payment issues</h3>
        </div>
      </div>

{/* == subscription section == */}
      <div className="flex items-center gap-3 mt-4 mb-6 ">
        <div className="p-2 bg-[#FEF9C3]">
        <img src={subscription} alt="subscription ending" className="w-5 h-5"/>
        </div>
        <div className="flex-col items-center">
          <h3 className="text-sm text-black font-bold">Subscriptions ending soon</h3>
          <h3 className="text-sm text-gray-700">7 dealers with expiring subscriptions</h3>
        </div>
      </div>
    </div>


{/* ===============liquidity gaps section card =============== */}
    <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex  justify-between items-center">
        <h3 className="text-sm font-semibold text-black">Liquidity Gaps</h3>
        <img src={liquidity} alt="revenue risk" className="w-5 h-5" />
      </div>

      {/* == BMW 3 Series Brakes == */} 
    <div className="flex flex-row  justify-between mt-3 px-3">
      <h3 className="font-semibold text-sm">BMW 3 Series Brakes</h3>
      <h3 className="font-semibold text-sm">84% demand gap</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#F9AE13] h-2 rounded-full"
    style={{ width: "84%" }}  
  >   
  </div>
      </div>

{/* === Michelin 225/45R17 section === */}
    <div className="flex flex-row  justify-between mt-3 px-3">
      <h3 className="font-semibold text-sm">Michelin 225/45R17</h3>
      <h3 className="font-semibold text-sm">72% demand gap</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#F9AE13] h-2 rounded-full"
    style={{ width: "72%" }}  
  >   
  </div>
      </div>

{/* === Toyota Hilux Filters === */}
    <div className="flex flex-row  justify-between mt-3 px-3">
      <h3 className="font-semibold text-sm">Toyota Hilux Filters</h3>
      <h3 className="font-semibold text-sm">63% demand gap</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#F9AE13] h-2 rounded-full"
    style={{ width: "63%" }}  
  >   
  </div>
      </div>
    </div>

{/* ==== Quick Actions card ==== */}
    <div className="border rounded shadow p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex  justify-between items-center">
        <h3 className="text-sm font-semibold text-black">Quick Actions</h3>
        <img src={quickactions} alt="revenue risk" className="w-5 h-5" />
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 gap-2">

        {/* == card 1 == */}
      <div className="relative border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24">
    <img src={approvedealers} alt="userswitch" className="w-4 h-4 mb-2 " />
    <img src={number} alt="number" className="w-4 h-4 absolute top-2 right-2" />

  {/* Text below */}
    <h3 className="text-gray-700 text-sm font-medium">Approve Dealers</h3>
</div>


{/* === card 2 === */}
{/* === respond tickets === */}
<div className="relative border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24">
  <img
    src={number}
    alt="number"
    className="w-4 h-4 absolute top-2 right-2"
  />

  <img
    src={respondtickets}
    alt="respond tickets"
    className="w-5 h-5 mb-2"
  />
  <h3 className="text-gray-700 text-sm font-medium">Respond Tickets</h3>
</div>


{/* === card 3 === */}
{/*=== view alerts === */}
<div className="border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24">
  <img src={viewalerts} alt="view alerts" className="w-4 h-4 mb-2" />
  <h3 className="text-gray-700 text-sm font-medium">View Alerts</h3>
</div>

{/* === card 4 === */}
{/* === generate report === */}
<div className="border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24">
  <img src={generatereport} alt="generate report" className="w-4 h-4 mb-2" />
  <h3 className="text-gray-700 text-sm font-medium">Generate Report</h3>
</div>
      </div>
      
      </div>
   </div>
        
        </main>
      </div>
  );
}
