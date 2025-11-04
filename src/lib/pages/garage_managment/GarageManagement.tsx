import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import total from "../../../assets/images/total.png";
import arrowup from "../../../assets/images/arrowup.png";
import requestsubmitted from "../../../assets/images/active_dealers.png";
import totalgarages from "../../../assets/images/total_garages.png";
import garageApproval from "../../../assets/images/garage_approval.png"
import checkcircle from "../../../assets/images/checkcircle.png";
import location from "../../../assets/images/location.png";
import phone from "../../../assets/images/phone.png";
import checkcircle2 from "../../../assets/images/CheckCircle2.png";
import quickservice from "../../../assets/images/quick service.png";
import email from "../../../assets/images/email.png";
import GarageKPIStatCard from "./component/GarageKPIStatCard";
import GarageApprovalCard from "./component/GarageApprovalCard";


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
                <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Garage Management" />
          
                {/* === Main Content === */}
                
                   <main
                  className={`p-6 mt-10 transition-all duration-300 ${
                    collapsed ? "md:ml-20" : "md:ml-64"
                  }`}
                > 

        {/* ===============four cards section ============== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GarageKPIStatCard
            title="Total"
            value={<h3 className="text-lg font-bold text-black">846</h3>}
            rightIconSrc={total}
            rightIconAlt="total"
            rightIconBgClassName="bg-[#DBEAFE]"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#3E38DA] ">143 in last 30 days </h2>
              <span className="text-sm font-semibold text-gray-700">Requests Submitted</span>
            </div>
          </GarageKPIStatCard>

          <GarageKPIStatCard
            title="Avg"
            value={<h3 className="text-md font-bold text-black">70%</h3>}
            rightIconSrc={arrowup}
            rightIconAlt="arrowup"
            rightIconBgClassName="bg-[#CAFFDC]"
          >
            <div className="flex items-center gap-2 mt-2 justify-between">
              <h2 className="text-sm font-bold text-gray-700">Request-to-Contact Ratio</h2>
            </div>
          </GarageKPIStatCard>

          <GarageKPIStatCard
            title="Avg"
            value={<h3 className="text-lg font-bold text-black">63%</h3>}
            rightIconSrc={requestsubmitted}
            rightIconAlt="active dealers"
            rightIconBgClassName="bg-[#F2E7FF]"
            rightIconSizeClassName="w-5 h-4"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-gray-700">Requests Submitted </h2>
            </div>
          </GarageKPIStatCard>

          <GarageKPIStatCard
            title="Active"
            value={<h3 className="text-lg font-bold text-black">3</h3>}
            rightIconSrc={totalgarages}
            rightIconAlt="chartbar"
            rightIconBgClassName="bg-[#FEF9C3]"
          >
            <div className="flex items-center gap-3 justify-between mt-2">
              <h2 className="text-sm font-bold text-[#16A34A]">2 approved </h2>
              <span className="text-sm text-gray-700">Total Garages</span>
            </div>
          </GarageKPIStatCard>
        </div>

  

{/* ============= garage approval section ========= */}
  <div className="mt-3 border rounded w-full p-4 shadow bg-white">
    <div className="flex flex-row items-center gap-3  ">
      <img src={garageApproval} alt="garage approval" className="w-4 h-4" />
      <h3 className="text-sm font-semibold text-black">Garage Approval Workflow</h3>
    </div>
    <GarageApprovalCard
      leftIconSrc={checkcircle}
      title="AutoFix Pro Garage"
      statusText="Approved"
      statusClassName="text-[#16A34A] bg-[#CAFFDC]"
      tradeLicenseIconSrc={checkcircle2}
      locationIconSrc={location}
      locationText="Downtown District"
      contactIconSrc={phone}
      contactText="Prefers phone"
      rightStatusText="Verified"
      onRightStatusClick={handleViewGarageProfile}
      tags={["Engine Repair", "Transmission", "Diagnostics"]}
    />
    <GarageApprovalCard
      leftIconSrc={quickservice}
      title="Quick Service Auto"
      statusText="Pending"
      statusClassName="text-[#CA8A04] bg-[#FEF9C3]"
      tradeLicenseIconSrc={quickservice}
      locationIconSrc={location}
      locationText="East Side"
      contactIconSrc={email}
      contactText="Prefers email"
      rightStatusText="Pending Verification"
      tags={["Oil Change", "Tire Service", "Brake Repair"]}
    />
    <GarageApprovalCard
      leftIconSrc={checkcircle}
      title="Premium Auto Care"
      statusText="Approved"
      statusClassName="text-[#16A34A] bg-[#CAFFDC]"
      tradeLicenseIconSrc={checkcircle2}
      locationIconSrc={location}
      locationText="North Avenue"
      contactIconSrc={phone}
      contactText="Prefers phone"
      rightStatusText="Verified"
      tags={["Luxury Vehicles", "Detailing", "Performance Tuning"]}
    />
  </div>

                </main>
                </div>
    
                )  
}