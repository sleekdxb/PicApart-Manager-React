import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';
import { type GarageAccount, approveGarage, fetchDashboardStatistics, type GarageFigCard } from "../../../services/garageManagementService";
import { getStoredAuth } from "../../../services/authService";

import johnsmith from "../../../assets/images/John Smith.png";
import pdf from "../../../assets/images/pdf.png";
import requests from "../../../assets/images/requests.png";
import listingclicks from "../../../assets/images/listing clicks.png";
import calls from "../../../assets/images/calls.png";
import chat from "../../../assets/images/Chat.png";
import ActivityMetricRow from "./component/ActivityMetricRow";
import DocumentRow from "./component/DocumentRow";

export default function GarageProfile(){
const navigate = useNavigate();
const location = useLocation();
const garageData = location.state?.garageData as { account: GarageAccount; garage: any } | undefined;
    
    
const [collapsed, setCollapsed] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState<string>('Status');
const [statusReason, setStatusReason] = useState<string>('');
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState<string | null>(null);
const [apiSuccess, setApiSuccess] = useState<string | null>(null);
const [activityMetrics, setActivityMetrics] = useState<GarageFigCard | null>(null);
const [loadingMetrics, setLoadingMetrics] = useState(false);

const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleViewClick= () => {
    navigate('/garage-management');
};

  const getStatusReason = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'Your Profile Is Approved';
      case 'pending':
        return 'Your Profile Is Under Review.';
      case 'rejected':
        return 'Your Profile has been Rejected';
      case 'amendment':
        return 'Your Profile Need Amendment';
      default:
        return '';
    }
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    const reason = getStatusReason(status);
    setStatusReason(reason);
    setStatusDropdownOpen(false);
    
    // Log the saved status and reason (you can use these variables for API calls)
    console.log('Selected Status:', status);
    console.log('Status Reason:', reason);
  };

  const statusOptions = ['Approved', 'Pending', 'Rejected', 'Amendment'];

  // Fetch Activity Metrics
  useEffect(() => {
    const fetchActivityMetrics = async () => {
      // Get staff_id from localStorage
      const auth = getStoredAuth();
      if (!auth?.data?.staff?.staff_id) {
        console.warn('Staff ID not found. Cannot fetch activity metrics.');
        return;
      }

      setLoadingMetrics(true);
      try {
        const response = await fetchDashboardStatistics(
          auth.data.staff.staff_id,
          "garage fig card"
        );

        if (response?.status && response?.data?.length > 0) {
          const metricsData = response.data[0]?.garage_fig_card;
          if (metricsData) {
            setActivityMetrics(metricsData);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch activity metrics:', error);
        // Don't show error to user, just log it
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchActivityMetrics();
  }, []);

  const handleSuspendGarage = async () => {
    // Validate that a status is selected
    if (selectedStatus === 'Status' || !statusReason) {
      setApiError('Please select a status from the dropdown');
      return;
    }

    // Validate garage data exists
    if (!garageData?.garage?.gra_id) {
      setApiError('Garage data is missing');
      return;
    }

    // Get staff_id from localStorage
    const auth = getStoredAuth();
    if (!auth?.data?.staff?.staff_id) {
      setApiError('Staff ID not found. Please login again.');
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setApiSuccess(null);

    try {
      const payload = {
        gra_id: garageData.garage.gra_id,
        staff_id: auth.data.staff.staff_id,
        state_name: selectedStatus,
        reason: statusReason,
        note: 'NA'
      };

      const response = await approveGarage(payload);

      if (response.status) {
        setApiSuccess(response.message || 'Garage status updated successfully');
        // Optionally refresh the page or update the garage data
      } else {
        setApiError(response.message || 'Failed to update garage status');
      }
    } catch (error: any) {
      setApiError(error?.message || 'Failed to update garage status');
    } finally {
      setIsLoading(false);
    }
  };
    return(
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

<div className="mt-4 flex items-center justify-between">
        <button onClick={handleViewClick}
            className="px-3 py-2 font-semibold text-sm text-black bg-white border rounded hover:bg-gray-50">Back</button>
        
        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            className="px-4 py-2 font-semibold text-sm text-black bg-white border rounded hover:bg-gray-50 flex items-center gap-2"
          >
            <span>{selectedStatus}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {statusDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setStatusDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedStatus === status ? 'bg-gray-100 font-semibold' : ''
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    <div className="mt-2  grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* ========= Garage Profile ========= */}
        <div className=" border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Garage Profile</h2>
            <div className="flex items-center gap-3 mt-3">
                <img src={johnsmith} alt="garage profile" className="w-10 h-10" />
                <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-semibold">{garageData?.garage?.garage_name || 'Unnamed Garage'}</h3>
                    <h3 className="text-sm text-gray-700">{garageData?.garage?.garage_email || garageData?.account?.email || 'N/A'}</h3>
                </div>
            
            </div>
            {/* ==== grid section ==== */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-between">
                <div className="grid-cols-1 md:grid-cols-2 ">
                <div className=" flex flex-col justify-between ">
                <h3 className="text-sm text-gray-700">Garage Name</h3>
                <h3 className="text-sm text-black font-semibold">{garageData?.garage?.garage_name || 'N/A'}</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Email</h3>
                <h3 className="text-sm text-black font-semibold">{garageData?.garage?.garage_email || garageData?.account?.email || 'N/A'}</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Location</h3>
                <h3 className="text-sm text-black font-semibold">{garageData?.garage?.garage_location || `${garageData?.garage?.location || ''}, ${garageData?.garage?.country || ''}` || 'N/A'}</h3>
                </div>
                </div>
                <div className="flex flex-col justify-start">
                <h3 className="text-sm text-gray-700">Contact Person</h3>
                <h3 className="text-sm text-black font-semibold">{garageData?.account?.firstName && garageData?.account?.lastName ? `${garageData.account.firstName} ${garageData.account.lastName}` : garageData?.account?.firstName || garageData?.account?.lastName || 'N/A'}</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Phone</h3>
                <h3 className="text-sm text-black font-semibold">{garageData?.garage?.business_phone || garageData?.account?.phone || 'N/A'}</h3>

                
             </div>
            
                </div> 
                </div>
        {/* ============= activity metrics section ============= */}
            <div className=" border rounded p-2 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-md text-black font-semibold">Activity Metrics</h2>
              {loadingMetrics ? (
                <div className="py-4 text-center text-gray-500 text-sm">Loading metrics...</div>
              ) : (
                <>
                  <ActivityMetricRow 
                    iconSrc={requests} 
                    iconBgClassName="bg-[#DBEAFE]" 
                    title="Total Requests" 
                    periodText="Last 30 days" 
                    valueText={activityMetrics?.total_requests?.toString() || "0"} 
                    valueClassName="text-[#3E38DA]" 
                  />
                  <ActivityMetricRow 
                    iconSrc={listingclicks} 
                    iconBgClassName="bg-[#DBEAFE]" 
                    title="Average Contact Ratio" 
                    periodText="Last 30 days" 
                    valueText={activityMetrics?.avg_total_contact_ratio ? activityMetrics.avg_total_contact_ratio.toFixed(2) : "0"} 
                    valueClassName="text-[#028174]" 
                  />
                  <ActivityMetricRow 
                    iconSrc={calls} 
                    iconBgClassName="bg-[#F2E7FF]" 
                    title="Average Requests Submitted" 
                    periodText="Last 30 days" 
                    valueText={activityMetrics?.avg_total_requests_submitted?.toString() || "0"} 
                    valueClassName="text-[#9333EA]" 
                  />
                  <ActivityMetricRow 
                    iconSrc={chat} 
                    iconBgClassName="bg-[#FEF9C3]" 
                    title="Total Active Garages" 
                    periodText="Last 30 days" 
                    valueText={activityMetrics?.total_garages_active?.toString() || "0"} 
                    valueClassName="text-[#CA8A04]" 
                  />
                </>
              )}
            </div>
</div>  
          {/* ========== Documents ========== */}
           
<div className="w-full mt-4 border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
  <h3 className="text-sm text-black font-semibold mb-4">
    Documents
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {garageData?.garage?.media_files && garageData.garage.media_files.length > 0 ? (() => {
      // Filter to only show Proof_of_Location and Registration_Certificate documents
      const allowedDocuments = garageData.garage.media_files.filter((file: any) => {
        const fileName = file.file_name || '';
        return fileName.includes('Proof_of_Location') || fileName.includes('Registration_Certificate');
      });

      if (allowedDocuments.length === 0) {
        return <div className="text-gray-500 text-sm">No documents available</div>;
      }

      return allowedDocuments.map((file: any, index: number) => {
        const isExpired = file.expiry_date && new Date(file.expiry_date) < new Date();
        const expiryDate = file.expiry_date ? new Date(file.expiry_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
        const statusText = isExpired ? 'Expired' : 'Valid';
        const statusClassName = isExpired ? 'text-red-600 bg-red-100' : 'text-[#028174] bg-[#CAFFDC]';
        const subText = expiryDate ? `Expires: ${expiryDate}` : 'No expiry date';
        
        // Clean up document name - remove IDs and underscores, format nicely
        let documentName = file.file_name || 'Document';
        if (documentName.includes('Proof_of_Location')) {
          documentName = 'Proof of Location';
        } else if (documentName.includes('Registration_Certificate')) {
          documentName = 'Registration Certificate';
        } else {
          // Fallback: remove IDs and clean up
          documentName = documentName
            .replace(/_\d+$/, '') // Remove trailing numbers
            .replace(/_[A-Z0-9]+$/g, '') // Remove trailing IDs
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, (l: string) => l.toUpperCase()); // Capitalize first letter of each word
        }
        
        return (
          <DocumentRow 
            key={file.id || index}
            iconSrc={pdf} 
            title={documentName} 
            statusText={statusText} 
            statusClassName={statusClassName} 
            subText={subText}
            onView={() => {
              if (file.file_path) {
                window.open(file.file_path, '_blank', 'noopener,noreferrer');
              }
            }}
          />
        );
      });
    })() : (
      <div className="text-gray-500 text-sm">No documents available</div>
    )}
  </div>
  <div className="flex flex-col items-end gap-3 mt-3">
      {apiError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {apiError}
        </div>
      )}
      {apiSuccess && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded px-3 py-2">
          {apiSuccess}
        </div>
      )}
      <button 
        onClick={handleSuspendGarage}
        disabled={isLoading || selectedStatus === 'Status'}
        className="px-3 py-2 border rounded text-white bg-[#028174] hover:bg-[#027165] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Updating...' : 'Suspend Garage'}
      </button>
</div> 
</div>
            
          
             </main>
             </div>
    )
}