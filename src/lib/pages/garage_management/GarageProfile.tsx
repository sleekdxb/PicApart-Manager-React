import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../components/CommonNavbar';

import johnsmith from "../../../assets/images/John Smith.png";
import pdf from "../../../assets/images/pdf.png";
import requests from "../../../assets/images/requests.png";
import listingclicks from "../../../assets/images/listing clicks.png";
import calls from "../../../assets/images/calls.png";
import chat from "../../../assets/images/Chat.png";

export default function GarageProfile(){
const navigate = useNavigate();
    
    
const [collapsed, setCollapsed] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    return(
       <div className="min-h-screen flex flex-col bg-gray-50">
             {/* === Sidebar === */}
             <Sidebar
               collapsed={collapsed}
               isOpen={isSidebarOpen}
               onClose={() => setIsSidebarOpen(false)}
             />
             
             {/* === Navbar with Toggle Button === */}
             <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title='Garage Management' />
       
             {/* === Main Content === */}
             
                <main
               className={`p-6 mt-10 transition-all duration-300 ${
                 collapsed ? "md:ml-20" : "md:ml-64"
               }`}
             > 

<div className="mt-4 flex ">
        <button onClick={handleViewClick}
            className="px-3 py-2  font-semibold text-sm text-black bg-white border rounded">Back</button>
            </div>
    <div className="mt-2  grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* ========= Garage Profile ========= */}
        <div className=" border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Garage Profile</h2>
            <div className="flex items-center gap-3 mt-3">
                <img src={johnsmith} alt="john smith" className="w-10 h-10" />
                <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-semibold">AutoFix Garage</h3>
                    <h3 className="text-sm text-gray-700">AutoFix.Garage@autoparts.com</h3>
                </div>
            
            </div>
            {/* ==== grid section ==== */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-between">
                <div className="grid-cols-1 md:grid-cols-2 ">
                <div className=" flex flex-col justify-between ">
                <h3 className="text-sm text-gray-700">Garage Name</h3>
                <h3 className="text-sm text-black font-semibold">AutoFix Garage</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Email</h3>
                <h3 className="text-sm text-black font-semibold">john@autocare.com</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Location</h3>
                <h3 className="text-sm text-black font-semibold">Downtown, Dubai, UAE</h3>
                </div>
                </div>
                <div className="flex flex-col justify-start">
                <h3 className="text-sm text-gray-700">Contact Person</h3>
                <h3 className="text-sm text-black font-semibold">John Smith</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Phone</h3>
                <h3 className="text-sm text-black font-semibold">+971 50 123 4567</h3>

                
             </div>
            
                </div> 
                </div>
        {/* ============= activity metrics section ============= */}
            <div className=" border rounded p-2 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Activity Metrics</h2>

            {/* ========= requests received ======== */}
     <div className="flex items-center gap-3 mt-4">
        <div className="border rounded p-2 bg-[#DBEAFE]">
    <img src={requests} alt="requests" className="w-4 h-4" />
    </div>
    <div className="flex flex-col w-full">
  <h3 className="text-sm font-semibold text-black">Requests Received</h3>
  <div className="flex flex-row justify-between items-center">
    <h3 className="text-sm text-gray-700">Last 30 days</h3>
    <h3 className="text-sm font-semibold text-[#3E38DA]">142</h3>
  </div>
</div>
</div>

{/* ========= Listing Clicks ======== */}
<div className="flex items-center gap-3 mt-4">
    <div className="border rounded p-2 bg-[#DBEAFE]">
    <img src={listingclicks} alt="listing clicks" className="w-4 h-4" />
    </div>
    <div className="flex flex-col w-full">
  <h3 className="text-sm font-semibold text-black">Listing Clicks</h3>
  <div className="flex flex-row justify-between items-center">
    <h3 className="text-sm text-gray-700">Last 30 days</h3>
    <h3 className="text-sm font-semibold text-[#028174]">856</h3>
  </div>
</div>
</div>

{/* ========== Calls to Vendors ========= */}
<div className="flex items-center gap-3 mt-4">
    <div className="border rounded p-2 bg-[#F2E7FF]">
    <img src={calls} alt="listing clicks" className="w-4 h-4" />
    </div>
    <div className="flex flex-col w-full">
  <h3 className="text-sm font-semibold text-black">Calls to Vendors</h3>
  <div className="flex flex-row justify-between items-center">
    <h3 className="text-sm text-gray-700">Last 30 days</h3>
    <h3 className="text-sm font-semibold text-[#9333EA]">67</h3>
  </div>
</div>
</div>

{/* =========Chats with Vendors ========= */}
<div className="flex items-center gap-3 mt-4">
    <div className="border rounded p-2 bg-[#FEF9C3]">
    <img src={chat} alt="listing clicks" className="w-4 h-4" />
    </div>
    <div className="flex flex-col w-full">
  <h3 className="text-sm font-semibold text-black">Chats with Vendors</h3>
  <div className="flex flex-row justify-between items-center">
    <h3 className="text-sm text-gray-700">Last 30 days</h3>
    <h3 className="text-sm font-semibold text-[#CA8A04]">89</h3>
  </div>
</div>
</div>
            
</div>
</div>  
          {/* ========== Documents ========== */}
           
<div className="w-full mt-4 border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
  <h3 className="text-sm text-black font-semibold mb-4">
    Documents
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* === Card 1 === */}
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
            <h3 className="text-sm text-[#028174] font-semibold">Trade License</h3>
            <h3 className="text-sm border rounded text-[#028174] bg-[#CAFFDC]">Valid</h3>
            </div>
            <h3 className="text-sm text-gray-700">
            Expires: December 31, 2025
            </h3>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

    {/* === Card 2 === */}
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
            <h3 className="text-sm text-[#028174] font-semibold">Proof of Location</h3>
            <h3 className="text-sm border rounded text-[#028174] bg-[#CAFFDC]">Valid</h3>
            </div>
            <h3 className="text-sm text-gray-700">
            Expires: December 31, 2025
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
   
    </div>

   
  </div>
  <div className="flex justify-end">
      <button className="mt-3 px-3 py-2 border rounded text-white bg-[#028174]">Suspend Garage</button>
</div> 
</div>
            
          
             </main>
             </div>
    )
}