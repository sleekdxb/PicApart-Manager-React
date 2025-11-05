import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';
import garageApproval from "../../../assets/images/garage_approval.png";
import checkcircle from "../../../assets/images/checkcircle.png";
import location from "../../../assets/images/location.png";
import phone from "../../../assets/images/phone.png";
import checkcircle2 from "../../../assets/images/CheckCircle2.png";
import quickservice from "../../../assets/images/quick service.png";
import email from "../../../assets/images/email.png";
import eyeIcon from "../../../assets/images/Eye.png";
import GarageApprovalCard from "./component/GarageApprovalCard";
import { fetchGarageAccounts, type GarageAccount } from "../../../services/garageManagementService";

export default function AllGarages() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [totalResults, setTotalResults] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [garageAccounts, setGarageAccounts] = useState<GarageAccount[]>([]);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleViewGarageProfile = (garageData: { account: GarageAccount; garage: any }) => {
    navigate('/garage-management/GarageProfile', { state: { garageData } });
  };

  const handleBack = () => {
    navigate('/garage-management');
  };

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

  // Fetch garage accounts
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchGarageAccounts(currentPage, perPage);
        if (cancelled) return;
        setGarageAccounts(res.data || []);
        setTotalResults(res.total || 0);
        setLastPage(res.last_page || 1);
        setFromIdx(res.from || 0);
        setToIdx(res.to || 0);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load garages');
        setGarageAccounts([]);
        setTotalResults(0);
        setLastPage(1);
        setFromIdx(0);
        setToIdx(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [currentPage, perPage]);

  // Flatten garage accounts to get individual garages
  const allGarages = garageAccounts.flatMap(account =>
    (account.garage || []).map(garage => ({ account, garage }))
  );

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
        {/* === Back Button === */}
        <div className="mt-4 flex">
          <button
            onClick={handleBack}
            className="px-3 py-2 font-semibold text-sm text-black bg-white border rounded hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        {/* === Header === */}
        <div className="mt-4 flex flex-row items-center justify-between gap-3">
          <div className="flex flex-row items-center gap-3">
            <img src={garageApproval} alt="garage approval" className="w-4 h-4" />
            <h3 className="text-sm font-semibold text-black">All Garages</h3>
          </div>
        </div>

        {/* === Garage Approval Workflow Section === */}
        <div className="mt-3 border rounded w-full p-4 shadow bg-white">
          {loading ? (
            <div className="py-6 text-center text-gray-500">Loading garages...</div>
          ) : error ? (
            <div className="py-6 text-center text-red-600">{error}</div>
          ) : allGarages.length === 0 ? (
            <div className="py-6 text-center text-gray-500">No garages found</div>
          ) : (
            <>
              {allGarages.map(({ account, garage }, index) => {
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
              })}
            </>
          )}
        </div>

        {/* === Pagination section === */}
        {!loading && !error && allGarages.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-500 gap-4">
            <p>
              Showing {fromIdx} to {toIdx} of {totalResults} results
            </p>

            {/* === Pagination buttons === */}
            <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
              {/* Previous Button */}
              <button
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                  let pageNum: number;
                  if (lastPage <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= lastPage - 2) {
                    pageNum = lastPage - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`px-3 py-1 border rounded-md hover:bg-gray-100 ${
                        currentPage === pageNum
                          ? 'bg-[#3E38DA] text-white border-[#3E38DA]'
                          : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage >= lastPage || loading}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

