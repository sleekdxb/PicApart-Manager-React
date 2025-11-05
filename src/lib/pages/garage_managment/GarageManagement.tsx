import {useState, useEffect} from 'react';
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
import eyeIcon from "../../../assets/images/Eye.png";
import GarageKPIStatCard from "./component/GarageKPIStatCard";
import GarageApprovalCard from "./component/GarageApprovalCard";
import { fetchGarageAccounts, type GarageAccount } from "../../../services/garageManagementService";


export default function GarageManagement(){
        const navigate= useNavigate();
    const [collapsed, setCollapsed] = useState(false);
          const [isSidebarOpen, setIsSidebarOpen] = useState(false);
          const [garageAccounts, setGarageAccounts] = useState<GarageAccount[]>([]);
          const [loading, setLoading] = useState(false);
          const [error, setError] = useState<string | null>(null);
        
          const handleToggleSidebar = () => {
            if (window.innerWidth < 768) {
              setIsSidebarOpen((prev) => !prev);
            } else {
              setCollapsed((prev) => !prev);
            }
          };

          const handleViewGarageProfile = (garageData: { account: GarageAccount; garage: any }) => {
            navigate('/garage-management/GarageProfile', { state: { garageData } });
        }

          const handleSeeAll = () => {
            navigate('/garage-management/AllGarages');
          }

          // Fetch garage accounts on mount
          useEffect(() => {
            let cancelled = false;
            async function load() {
              setLoading(true);
              setError(null);
              try {
                const res = await fetchGarageAccounts(1, 15);
                if (cancelled) return;
                setGarageAccounts(res.data || []);
              } catch (e: any) {
                if (cancelled) return;
                setError(e?.message || 'Failed to load garages');
                setGarageAccounts([]);
              } finally {
                if (!cancelled) setLoading(false);
              }
            }
            load();
            return () => { cancelled = true; };
          }, []);

          // Helper function to get garage status
          const getGarageStatus = (garage: any) => {
            // If garage_state is empty, show "Approved"
            if (!garage.garage_state || garage.garage_state.length === 0) {
              return { 
                text: 'Approved', 
                className: 'text-[#16A34A] bg-[#CAFFDC]',
                rightStatusText: 'Approved',
                stateName: null
              };
            }
            // If garage_state exists, use state_name from the latest state
            const latestState = garage.garage_state[garage.garage_state.length - 1];
            const stateName = latestState.state_name || 'Approved';
            const stateCode = latestState.state_code?.toUpperCase();
            
            // Determine if it's approved based on state_code
            if (stateCode === 'APPROVED' || stateCode === 'VERIFIED') {
              return { 
                text: 'Approved', 
                className: 'text-[#16A34A] bg-[#CAFFDC]',
                rightStatusText: stateName,
                stateName
              };
            }
            // For other states, show as pending
            return { 
              text: 'Pending', 
              className: 'text-[#CA8A04] bg-[#FEF9C3]',
              rightStatusText: stateName,
              stateName
            };
          };

          // Flatten garage accounts to get individual garages
          const allGarages = garageAccounts.flatMap(account => 
            (account.garage || []).map(garage => ({ account, garage }))
          );

          // Show only first 3 garages
          const displayedGarages = allGarages.slice(0, 3);
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
    <div className="flex flex-row items-center justify-between gap-3 mb-3">
      <div className="flex flex-row items-center gap-3">
        <img src={garageApproval} alt="garage approval" className="w-4 h-4" />
        <h3 className="text-sm font-semibold text-black">Garage Approval Workflow</h3>
      </div>
      {!loading && (
        <button
          onClick={handleSeeAll}
          className="text-sm text-[#3E38DA] hover:text-[#2d2aa8] hover:underline font-semibold cursor-pointer transition-colors px-2 py-1"
        >
          See More
        </button>
      )}
    </div>
    {loading ? (
      <div className="py-6 text-center text-gray-500">Loading garages...</div>
    ) : error ? (
      <div className="py-6 text-center text-red-600">{error}</div>
    ) : displayedGarages.length === 0 ? (
      <div className="py-6 text-center text-gray-500">No garages found</div>
    ) : (
      displayedGarages.map(({ account, garage }, index) => {
        const status = getGarageStatus(garage);
        const hasTradeLicense = garage.media_files && garage.media_files.length > 0;
        const contactMethod = garage.garage_email ? 'email' : 'phone';
        
        return (
          <GarageApprovalCard
            key={`${account.acc_id}-${garage.gra_id}-${index}`}
            leftIconSrc={status.text === 'Approved' ? checkcircle : quickservice}
            title={garage.garage_name || 'Unnamed Garage'}
            statusText={status.rightStatusText || status.text}
            statusClassName={status.className}
            tradeLicenseIconSrc={hasTradeLicense ? checkcircle2 : quickservice}
            locationIconSrc={location}
            locationText={garage.garage_location || `${garage.location}, ${garage.country}`}
            contactIconSrc={contactMethod === 'email' ? email : phone}
            contactText={`Prefers ${contactMethod}`}
            rightStatusText={status.rightStatusText || 'Pending Verification'}
            onRightStatusClick={() => handleViewGarageProfile({ account, garage })}
            onEyeClick={() => handleViewGarageProfile({ account, garage })}
            eyeIconSrc={eyeIcon}
            tags={[]}
          />
        );
      })
    )}
  </div>

                </main>
                </div>
    
                )  
}