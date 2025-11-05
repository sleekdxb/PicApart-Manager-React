import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../components/CommonNavbar';

import johnsmith from "../../../assets/images/John Smith.png";
import pdf from "../../../assets/images/pdf.png";

export default function AccountOwner(){
const navigate=useNavigate();
    
    
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
    navigate('/dealer-management');
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
             <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management" />
       
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
        {/* ========= account owner details ========= */}
        <div className=" border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Account Owner Details</h2>
            <div className="flex items-center gap-3 mt-3">
                <img src={johnsmith} alt="john smith" className="w-10 h-10" />
                <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-semibold">John Smith</h3>
                    <h3 className="text-sm text-gray-700">Vendor ID: VD1001</h3>
                    <button className=" px-3 py-2 text-sm font-semibold text-[#028174] bg-[#CAFFDC] border rounded">Approved</button>
                </div>
            
            </div>
            {/* ==== grid section ==== */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
                <div className="grid-cols-1 md:grid-cols-2 ">
                <div className=" flex flex-col justify-between ">
                <h3 className="text-sm text-gray-700">Contact Person</h3>
                <h3 className="text-sm text-black">John Smith</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Phone</h3>
                <h3 className="text-sm text-black">+971 50 123 4567</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Registration Date</h3>
                <h3 className="text-sm text-black">15 May 2025</h3>
                </div>
                </div>
                <div className="flex flex-col justify-start">
                <h3 className="text-sm text-gray-700">Email</h3>
                <h3 className="text-sm text-black">john@autoparts.com</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Subscription Plan</h3>
                <h3 className="text-sm text-black">Premium (AED 499/month)</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Last Active</h3>
                <h3 className="text-sm text-black">2 hours ago</h3>
             </div>
            
                </div>

                
                </div>
                {/* ============= activity metrics section ============= */}
                <div className=" border rounded p-2 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Activity Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Requests Received</h3>
                    <h3 className="text-md text-black font-semibold mt-2">142</h3>
                    <h3 className="text-sm text-[#16A34A] mt-2">+12 in last 30 days</h3>
                </div>

                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Match Rate</h3>
                    <h3 className="text-md text-black font-semibold mt-2">78%</h3>
                    <h3 className="text-sm text-[#16A34A] mt-2">+5% from last month</h3>
                </div>

                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Contact Rate</h3>
                    <h3 className="text-md text-black font-semibold mt-2">65%</h3>
                    <h3 className="text-sm text-[#CA8A04] mt-2">-3% from last month</h3>
                </div>

                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Chats/Calls Initiated</h3>
                    <h3 className="text-md text-black font-semibold mt-2">93</h3>
                    <h3 className="text-sm text-[#16A34A] mt-2">+8 in last 30 days</h3>
                </div>

                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Login Frequency</h3>
                    <h3 className="text-md text-black font-semibold mt-2">2.3/day</h3>
                    <h3 className="text-sm text-[#16A34A] mt-2">Stable</h3>
                </div>

                <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
                    <h3 className="text-sm text-gray-700">Last Active</h3>
                    <h3 className="text-md text-black font-semibold mt-2">Today</h3>
                    <h3 className="text-sm text-[#3E38DA] mt-2">2 hours ago</h3>
                </div>
            </div>
            
           </div>
                </div>  
          {/* ========== account owner documents ========== */}
           
<div className="w-full mt-4 border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
  <h3 className="text-sm text-black font-semibold mb-4">
    Account Owner Documents
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* === Card 1 === */}
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">Driving Licence Front</h3>
            <h3 className="text-sm text-gray-700">
              Expiring Date: 2025-08-30
            </h3>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
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
            <h3 className="text-sm text-[#028174] font-semibold">Driving Licence Back</h3>
            <h3 className="text-sm text-gray-700">
              Expiring Date: 2025-08-30
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

    {/* === Card 3 === */}
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">Passport</h3>
            <h3 className="text-sm text-gray-700">
              Expiring Date: 2025-08-30
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

    
  </div>
  
</div>

{/* =============Business Details ============ */}
<div className="mt-4  grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* ========= account owner details ========= */}
        <div className=" border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-md text-black font-semibold">Business Details</h2>
            <div className="flex items-center gap-3 mt-3">
                <img src={johnsmith} alt="john smith" className="w-10 h-10" />
                <div className="flex-col items-center">
                    <h3 className="text-sm text-black font-semibold">AutoFix Garage</h3>
                    <h3 className="text-sm text-gray-700">AutoFix.Garage@autoparts.com</h3>
                    <button className=" px-3 py-2 text-sm font-semibold text-[#3E38DA] bg-[#DBEAFE] border rounded">Premium Plan</button>
                </div>
            
            </div>
            {/* ==== grid section ==== */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 justify-between">
                <div className="grid-cols-1 md:grid-cols-2 ">
                <div className=" flex flex-col justify-between ">
                <h3 className="text-sm text-gray-700">Bussiness Name:</h3>
                <h3 className="text-sm text-black">AutoFix Garage</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Garage Location:</h3>
                <h3 className="text-sm text-black">15 Street 16,Dubai,United Arab Emirates</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Email Address:</h3>
                <h3 className="text-sm text-black">AutoFix.Garage@autoparts.com</h3>
                </div>
                </div>
                <div className="flex flex-col justify-start">
                <h3 className="text-sm text-gray-700">Country & Location:</h3>
                <h3 className="text-sm text-black">Ottawa</h3>

                
                <h3 className="text-sm text-gray-700 mt-3">Phone Number:</h3>
                <h3 className="text-sm text-black">+1 912 5060 8208</h3>              
             </div>
            
                </div>   
                </div>

{/* =========== Business Documents ============ */}

    <div className="w-full  border rounded p-4 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ">
  <h3 className="text-sm text-black font-semibold mb-4">
  Business Documents
  </h3>
    {/* === Card 1 === */}
    <div className="border rounded p-3 w-full mt-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">Trade Licence Document</h3>
            <h3 className="text-sm text-gray-700">
            Expiring Date:
            </h3>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

    {/* === Card 2 === */}
    <div className="border rounded p-3 w-full mt-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">Tax Registration Document</h3>
            <h3 className="text-sm text-gray-700">
            Expiring Date:2025-08-30
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

    {/* === Card 3 === */}
    <div className="border rounded p-3 w-full mt-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={pdf} alt="pdf" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">Proof of Address Document</h3>
            <h3 className="text-sm text-gray-700">
            Expiring Date:2025-08-30
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <select className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none">
            <option value="">Status</option>
          </select>
          <button className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>

<div className="flex justify-end">
    <button className="text-sm mt-2 px-4 py-2 text-white bg-[#028174] border rounded">Submit</button>
  </div>
  </div>
  
</div>
            


            
             </main>
             </div>
    )
}