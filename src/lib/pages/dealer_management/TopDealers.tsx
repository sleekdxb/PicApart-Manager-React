import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../components/CommonNavbar';
import searchIcon from "../../../assets/images/searchIcon2.png";

export default function DealerManagement(){
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
    return (
<div className="min-h-screen flex flex-col bg-gray-50">
      {/* === Sidebar === */}
      <Sidebar
        collapsed={collapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* === Navbar with Toggle Button === */}
      <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title ="Dealer Management"/>

      {/* === Main Content === */}
      
         <main
        className={`p-6 mt-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      > 
{/* ========== top dealers cards ============= */}
<div className="mt-4 flex justify-between items-center">
    <h3 className="text-md font-semibold text-black">More Dealers</h3>
        <button onClick={handleViewClick}
            className="px-2 py-3  font-semibold text-sm text-[#028174]">Cancel</button>
            </div>

            {/* ==== search section ==== */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:col-span-4 ">
    {/* Search Input */}
    <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full shadow-sm">

      <img
        src={searchIcon}
        alt="Search Icon"
        className="w-4 h-4 text-gray-400 mr-2"
      />
      <input
        type="text"
        placeholder="Search leads..."
        className="flex-1 outline-none text-sm placeholder-gray-400 bg-transparent"
      />
    </div>
    </div>
{/* ==== subscription === */}
    <div className="col-span-1 border rounded px-3 py-2 gap-3 shadow bg-white border-gray-200 ">
            <label className="font-semibold text-gray-700">Subscription</label>
            <select className="focus:outline-none">
                <option value=""></option>
            </select>
           </div>
{/* ======= location ========= */}
           <div className="col-span-1 border rounded px-3 py-2 gap-3 shadow bg-white border-gray-200 ">
            <label className="font-semibold text-gray-700">Location</label>
            <select className="focus:outline-none">
                <option value=""></option>
            </select>
           </div>
    </div>

            {/* ===== grid cards section ====  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
      {/* ============= card 1 =============== */}
      <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex  items-center justify-between">
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
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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
 
 {/* ============= card 4 =============== */}
 <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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

{/* ========= card 5 ============ */}
    {/* ========= Tyre Experts Ltd ========= */}
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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

{/* ========= card 6 ========== */}
{/* ========= Auto Parts Warehouse ========= */}
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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

{/* ============= card 7 =============== */}
<div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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

{/* ========= card 8 ============ */}
    {/* ========= Tyre Experts Ltd ========= */}
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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

{/* ========= card 9 ========== */}
{/* ========= Auto Parts Warehouse ========= */}
    <div className="border rounded  shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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
      </main>
      </div>
    )
}
