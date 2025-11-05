import {useState} from 'react';
 import {useNavigate} from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../components/CommonNavbar';
import eyeIcon from "../../../assets/images/Eye.png";


interface Client {
    name:string;
    id: number;
    documents: string;
    submitted: string;
    type:string;
    contact:string;
    businessname:string;
    subscription:string;
  }
  
  const dummyClients: Client[] = [
    {
      id: 1,
      name: "JohnDoe",
      businessname: "AutoParts Central",
      type: "New Dealer",
      contact: "john.doe@example.com",
      subscription: "premium",
      documents: "3 files",
      submitted: "2025-05-15",
    },

    {
      id: 2,
      name: "TireMaster",
      businessname:"Tire Masters Inc",
      type: "Upgrade",
      contact: "Info@tiremaster-example.com",
      documents: "2 files",
      submitted: "2025-05-14",
      subscription: "pro",
    },
    {
      id: 3,
      name: "EuroParts",
      businessname: "European Auto Parts",
      type: "Profile update",
      contact: "contact@europaarts-demo.com",
      documents: "1 files",
      submitted: "2025-05-15",
      subscription: "basic",
    },

    {
      id: 4,
      name: "EuroParts",
      businessname: "European Auto Parts",
      type: "Profile update",
      contact: "contact@europaarts-demo.com",
      documents: "1 files",
      submitted: "2025-05-15",
      subscription: "basic",
    },

    {
      id: 5,
      name: "EuroParts",
      businessname: "European Auto Parts",
      type: "Profile update",
      contact: "contact@europaarts-demo.com",
      documents: "1 files",
      submitted: "2025-05-15",
      subscription: "basic",
    },

    {
      id: 6,
      name: "EuroParts",
      businessname: "European Auto Parts",
      type: "Profile update",
      contact: "contact@europaarts-demo.com",
      documents: "1 files",
      submitted: "2025-05-15",
      subscription: "basic",
    },
     
  ];


export default function DealerManagement(){
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

      const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5
const totalResults = dummyClients.length;
const startIndex = (currentPage - 1) * itemsPerPage + 1;
const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

const handleViewTopDealers = () => {
    navigate('/dealer-management/TopDealers'); 
  };

const handleViewAccountOwner =() => {
    navigate('/dealer-management/AccountOwner');
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
      <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management"/>

      {/* === Main Content === */}
      
         <main
        className={`p-6 mt-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      > 


      {/* === Pending Approvals Table === */}
<div className="flex flex-col lg:flex-row gap-4 mt-6">
  <div className="bg-white rounded-lg border border-gray-100 shadow p-4 flex-1">
  <div className="-mx-4 px-4 border-b pb-2 mb-4 flex flex-col lg:flex-row justify-between items-center gap-4">
  <h2 className="text-lg font-semibold text-gray-900 w-full lg:w-auto">
  Pending Approvals
  </h2>


    {/* === actions pending Button === */}
    <button 
    className="flex items-center gap-2 bg-[#ecf3fe] text-[#3E38DA] px-4 py-2 rounded-full text-sm ">
      3 actions pending
    </button>
  </div>


{/* ==== table === */}
<div className="bg-white rounded-lg border border-gray-100 shadow p-4 overflow-x-auto">
          <table className="min-w-[850px] w-full text-sm text-left border-collapse">
            <thead className="text-gray-600 border-b bg-[#ecf3fe]">
              <tr>
              <th className="font-semibold">BUSINESS NAME</th>
                <th className="font-semibold">TYPE</th>
                <th className="font-semibold">CONTACT PERSON</th>
                <th className="font-semibold">SUBSCRIPTION</th>
                <th className="font-semibold">SUBMITTED ON</th>
                <th className="font-semibold">DOCUMENTS</th>
                <th className="text-center font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dummyClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                    {/* business name */}
                  <td className="text-gray-700">{client.businessname}</td>

                 
               
               {/* client type */}
               <td className="py-3">
               <div className="flex flex-col">
                    <div className="text-sm text-gray-500">{client.type}</div>
                    </div>
                  </td>

                  
                  {/* Contact */}
                  <td>
                    <div className="flex flex-col  justify-center">
                        <h3 className="text-sm text-center text-gray-500">{client.name}</h3>
                    <div className="text-sm text-gray-500 text-left">{client.contact}</div>
                    </div>
                  </td>
  


                  {/* subscription */}
                  <td>
                    <span
                     className={`px-3 py-2 text-xs font-medium rounded ${
                        client.subscription === "premium"
                        ? "bg-[#F2E7FF] text-[#9333EA]"
                        : client.subscription === "pro"
                        ? "bg-[#DBEAFE] text-[#3E38DA]"
                        : client.subscription === "basic"
                        ? "bg-[#FEF9C3] text-[#CA8A04]"
                        : "bg-[#FEF9C3] text-[#CA8A04]"
                        
                     }`}
                     >
                        {client.subscription}
                     </span>
                  </td>

                  {/* date of submission */}
                  <td>{client.submitted}</td>


                  {/* documents */}
                  <td>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        client.documents === "3 files"
                          ? "bg-[#DBEAFE] text-[#3E38DA]"
                          : client.documents === "2 files"
                          ? "bg-[#DBEAFE] text-[#3E38DA]"
                          : client.documents === "1 files"
                          ? "bg-[#DBEAFE] text-[#3E38DA]"
                          : "bg-[#DBEAFE] text-[#3E38DA]"
                      }`}
                    >
                      {client.documents}
                    </span>
                  </td>

                 
                  
                  {/* Action */}
                  <td className="text-center">
                    <button onClick={handleViewAccountOwner}
                    className="flex justify-center items-center mx-auto hover:opacity-80 transition">
                      <img src={eyeIcon} alt="View" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      {/* === Pagination section === */}
    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
      <p>
      Showing {startIndex} to {endIndex} of {totalResults} results
      </p>

   {/* === Pagination buttons === */}
<div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-700">

  {/* Previous Button */}
  <button
    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  >
    &lt;
  </button>

  {/* Always show first 3 pages */}
  {[1, 2, 3].map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 border rounded-md transition-all ${
        currentPage === page
          ? "bg-[#00435A] text-white border-[#00435A]"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {page}
    </button>
  ))}

  {/* Ellipsis */}
  <span className="px-2 text-gray-500">...</span>

  {/* Last Page  */}
  <button
    onClick={() => setCurrentPage(8)}
    className={`px-3 py-1 border rounded-md transition-all ${
      currentPage === 8
        ? "bg-[#00435A] text-white border-[#00435A]"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    8
  </button>

  {/* Next Button */}
  <button
    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
    disabled={currentPage === 8}
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 8))}
  >
    &gt;
  </button>
</div>


{/* === rows per page section === */}
<div className="flex items-center justify-end gap-3 mt-4 text-sm">
      <p className="text-gray-700  ">Rows per page</p>
      <div className="border  border-gray-300 rounded-md px-2 py-3">
        <span className="text-sm text-gray-700">100</span>
      </div>
      </div>
    </div>

</div>

</div>

{/* ============ Dealer Value Scoring ============ */}
<div className="mt-4 ">
            <div className="text-md text-black font-semibold">Dealer Value Scoring</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* ===== Listing Quality ========= */}
                <div className="mt-4 border rounded shadow p-3 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-black">Listing Quality</h3>
                    <h3 className="font-semibold text-sm text-[#028174]">4/5</h3>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-700 mt-3">Based on images & descriptions completeness</h3>
                </div>
               
               {/* ========== Responsiveness ========= */}
                <div className="mt-4 border rounded shadow p-3 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-black">Responsiveness</h3>
                    <h3 className="font-semibold text-sm text-[#028174]">5/5</h3>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-700 mt-3">Average time to first contact</h3>
                </div>
              
              {/* =========== Engagement =========== */}
                <div className="mt-4 border rounded shadow p-3 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-black">Engagement</h3>
                    <h3 className="font-semibold text-sm text-[#028174]">5/5</h3>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-700 mt-3">Login frequency & stock updates</h3>
                </div>
 
                 {/* ========== Overall Score ============*/}
                <div className="mt-4 border rounded shadow p-3 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-black">Overall Score</h3>
                    <h3 className="font-semibold text-sm text-[#028174]">5/5</h3>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-700 mt-3">Login frequency & stock updates</h3>
                </div>
            </div>

             {/* ============== top dealers ============*/}
            <div className="mt-4 flex justify-between">
                <h3 className="text-md font-semibold text-black">Top Dealers</h3>
                <button onClick={handleViewTopDealers}
                className="px-2 py-3  font-semibold text-sm text-[#028174]">View More</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                {/* ============= card 1 =============== */}
            <div className="border rounded mt-3 shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-black">Listing Quality</h3>
            {/* ==== star rating ===== */}
                <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={star <= 5 ? "#FF8C00" : "#d1d5db"}
                
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.288-3.967z" />
              </svg>
          ))}
          </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mt-3">contact@germanparts.com</h3>

       <div className="mt-3">
        <h3 className="font-semibold text-sm text-black">Activity Metrics</h3>
        </div>
        <div className="mt-2 flex gap-6 ">
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Requests:142</h3>
            <h3 className="text-sm text-black">Contact Rate:92%</h3>
            </div>
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Match Rate:78%</h3>
            <h3 className="text-sm text-gray-700">Logins: Daily</h3>
       </div>
       </div>
       <div className="mt-3 border border-[#EFEFEF]"></div>
<button className="px-2 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded">Premium</button>
            </div>

{/* ========= card 2 ============ */}
    {/* ========= Tyre Experts Ltd ========= */}
    <div className="border rounded mt-3 shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-black">Tyre Experts Ltd</h3>
            {/* ==== star rating ===== */}
                <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={star >= 2 ? "#FF8C00" : "#d1d5db"}
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.288-3.967z" />
              </svg>
          ))}
          </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mt-3">sales@tyreexperts.com</h3>

       <div className="mt-3">
        <h3 className="font-semibold text-sm text-black">Activity Metrics</h3>
        </div>
        <div className="mt-2 flex gap-6 ">
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Requests:38</h3>
            <h3 className="text-sm text-black">Contact Rate: 84%</h3>
            </div>
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Match Rate:65%</h3>
            <h3 className="text-sm text-gray-700">Logins:Weekly</h3>
       </div>
       </div>
       <div className="mt-3 border border-[#EFEFEF]"></div>
<button className="px-4 py-3 mt-2 text-sm text-[#3E38DA] bg-[#DBEAFE] border rounded">Pro</button>
            </div>

{/* ========= card 3 ========== */}
{/* ========= Auto Parts Warehouse ========= */}
    <div className="border rounded mt-3 shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-black">Auto Parts Warehouse</h3>
            {/* ==== star rating ===== */}
                <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={star >= 3 ? "#FF8C00" : "#d1d5db"}
                className="w-5 h-5 hover:scale-110 transition-transform"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.288-3.967z" />
              </svg>
          ))}
          </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mt-3">info@autopartswh.com</h3>

       <div className="mt-3">
        <h3 className="font-semibold text-sm text-black">Activity Metrics</h3>
        </div>
        <div className="mt-2 flex gap-6 ">
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Requests:210</h3>
            <h3 className="text-sm text-black">Contact Rate: 72%</h3>
            </div>
            <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-700">Match Rate:45%</h3>
            <h3 className="text-sm text-gray-700">Logins:Daily</h3>
       </div>
       </div>
       <div className="mt-3 border border-[#EFEFEF]"></div>
<button className="px-4 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded">Basic</button>
            </div>
          </div> 
 
          </div>
          
      </main>
      </div>
       )
}