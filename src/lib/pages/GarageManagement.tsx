import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GarageManagementNavbar from './GarageManagementNavbar';

import total from "../../assets/images/total.png";
import arrowup from "../../assets/images/arrowup.png";
import requestsubmitted from "../../assets/images/active_dealers.png";
import totalgarages from "../../assets/images/total_garages.png";
import garageApproval from "../../assets/images/garage_approval.png"
import checkcircle from "../../assets/images/checkcircle.png";
import location from "../../assets/images/location.png";
import phone from "../../assets/images/phone.png";
import checkcircle2 from "../../assets/images/CheckCircle2.png";
import quickservice from "../../assets/images/quick service.png";
import email from "../../assets/images/email.png";


export default function GarageManagement(){
        const navigate= useNavigate();
    const [collapsed, setCollapsed] = useState(false);
          const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        
          const handleToggleSidebar = () => {
            if (window.innerWidth < 768) {
              setIsSidebarOpen((prev) => !prev);
            } else {
              setCollapsed((prev) => !prev);
            }
          };

          const handleViewGarageProfile =() => {
            navigate('/garage-management/GarageProfile');
        }
          return (
          <div className="min-h-screen flex flex-col bg-gray-50">
                {/* === Sidebar === */}
                <Sidebar
                  collapsed={collapsed}
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
                
                {/* === Navbar with Toggle Button === */}
                <GarageManagementNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} />
          
                {/* === Main Content === */}
                
                   <main
                  className={`p-6 mt-10 transition-all duration-300 ${
                    collapsed ? "md:ml-20" : "md:ml-64"
                  }`}
                > 

        {/* ===============four cards section ============== */}
        {/* ==== card 1 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="mt-3 bg-white border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <h3 className="text-sm font-semibold text-gray-600">Total</h3>
          <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">846</h3>
      </div>
          <div className="bg-[#DBEAFE] p-2 rounded-md ">
          <img src={total} alt="total" className="w-4 h-4" />
          </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <h2 className="text-sm font-semibold text-[#3E38DA] ">143 in last 30 days </h2>
            <span className="text-sm font-semibold text-gray-700">Requests Submitted</span>
          </div>
         </div>

         {/* ==== card 2 ==== */}

      <div className="mt-3 border bg-white rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Avg</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-md font-bold text-black">70%</h3>
      </div>
      <div className="bg-[#CAFFDC] p-2 rounded-md">
        <img src={arrowup} alt="arrowup" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2 justify-between">
      <h2 className="text-sm font-bold text-gray-700">Request-to-Contact Ratio</h2>
      
    </div>
  </div>
 
        {/* ======== card 3 ========== */}
    <div className="mt-3 border bg-white rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Avg</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">63%</h3>
      </div>
      <div className="bg-[#F2E7FF] p-2 rounded-md">
        <img src={requestsubmitted} alt="active dealers" className="w-5 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <h2 className="text-sm font-bold text-gray-700">Requests Submitted </h2>
    </div>
  </div>

         {/* ====== card 4 ======= */}
     <div className="mt-3 border bg-white rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Active</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">3</h3>
      </div>
      <div className="bg-[#FEF9C3] p-2 rounded-md">
        <img src={totalgarages} alt="chartbar" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-3 justify-between mt-2">
      <h2 className="text-sm font-bold text-[#16A34A]">2 approved </h2>
      <span className="text-sm text-gray-700">Total Garages</span>
    </div>
  </div>
  </div>

  

{/* ============= garage approval section ========= */}
  <div className="mt-3 border rounded w-full p-4 shadow bg-white">
    <div className="flex flex-row items-center gap-3  ">
        <img src={garageApproval} alt="garage approval" className="w-4 h-4" />
        <h3 className="text-sm font-semibold text-black">Garage Approval Workflow</h3>
    </div>

    {/* =============== AutoFix Pro Garage card ============= */}
    <div className="border rounded mt-3 p-2">
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={checkcircle} alt="checkcircle" className="w-4 h-4" />
            <h3 className="text-sm text-black font-semibold">AutoFix Pro Garage</h3>
            <button className="text-sm text-[#16A34A] bg-[#CAFFDC] px-3 py-2">Approved</button>
            </div>
            <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-gray-700 font-semibold">Trade License:</h3>
            <img src={checkcircle2} alt="checkcircle2" className="w-4 h-4" />
            </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={location} alt="location" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">Downtown District</h3>
            <img src={phone} alt="phone" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">Prefers phone</h3>
            </div>
            <button onClick={handleViewGarageProfile}
            className="text-sm text-gray-700">Verified</button>
            </div>
            <div className="flex flex-row items-center gap-2">
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Engine Repair</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Transmission</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Diagnostics</button>
            </div>
    </div>

{/* ============== Quick Service Auto card ================ */}
    <div className="border rounded mt-3 p-2">
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={quickservice} alt="checkcircle" className="w-4 h-4" />
            <h3 className="text-sm text-black font-semibold">Quick Service Auto</h3>
            <button className="text-sm text-[#CA8A04] bg-[#FEF9C3] px-3 py-2">Pending</button>
            </div>
            <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-gray-700 font-semibold">Trade License:</h3>
            <img src={quickservice} alt="checkcircle2" className="w-4 h-4" />
            </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={location} alt="location" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">East Side</h3>
            <img src={email} alt="phone" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">Prefers email</h3>
            </div>
            <h3 className="text-sm text-gray-700">Pending Verification</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Oil Change</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Tire Service</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Brake Repair</button>
            </div>
    </div>

 {/* =============== Premium Auto Care card ============= */}
 <div className="border rounded mt-3 p-2">
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={checkcircle} alt="checkcircle" className="w-4 h-4" />
            <h3 className="text-sm text-black font-semibold">Premium Auto Care</h3>
            <button className="text-sm text-[#16A34A] bg-[#CAFFDC] px-3 py-2">Approved</button>
            </div>
            <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-gray-700 font-semibold">Trade License:</h3>
            <img src={checkcircle2} alt="checkcircle2" className="w-4 h-4" />
            </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
            <img src={location} alt="location" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">North Avenue</h3>
            <img src={phone} alt="phone" className="w-4 h-4" />
            <h3 className="text-sm text-gray-700">Prefers phone</h3>
            </div>
            <h3 className="text-sm text-gray-700">Verified</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Luxury Vehicles</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Detailing</button>
                <button className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">Performance Tuning</button>
            </div>
    </div>   
  </div>

                </main>
                </div>
    
                )  
}