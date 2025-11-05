import {useState} from 'react';

import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../components/CommonNavbar';
import liquidityscore from "../../../assets/images/liquidityscore.png";
import arrowup from "../../../assets/images/arrowup.png";
import attention from "../../../assets/images/revenue risk.png";
import coupons from "../../../assets/images/coupons.png";
import download from "../../../assets/images/download.png";
import checkcircle from "../../../assets/images/checkcircle.png";
import exporticon from "../../../assets/images/export.png";
import clock from "../../../assets/images/Clock.png";
import trendup from "../../../assets/images/TrendUp.png";
import dropdownup from "../../../assets/images/dropdownup.png";
import dropdowndown from "../../../assets/images/dropdowndown.png";
import billing from "../../../assets/images/billing.png";
import editcoupon from "../../../assets/images/edit coupon.png";
import EditCoupon from './component/modals/EditCoupon';
import Failedpayments from './component/Failedpayments';
import Dealercommunication from './component/Dealercommunication';
import SubscriptionAnalytics from './component/SubscriptionAnalytics';



interface Client {
    id:number;
    companyname:string;
    invoiceid: string;
    plan: string;
    renewaldate:string;
    payment:string;
    status:string;
    amount:string;

  }
  
  const dummyClients: Client[] = [
    {
      id: 1,
      companyname: "AutoParts Deluxe",
      plan: "Enterprise",
      renewaldate: "15/11/2025",
      payment: "Credit Card (****4532)",
      status: checkcircle,
      invoiceid: "INV-2025-001",
      amount: '$299.99' ,
    },

    {
        id: 2,
        companyname: "Quick Fix Auto",
        plan: "Professional",
        renewaldate: "08/11/2025",
        payment: "Bank Transfer",
        status: checkcircle,
        invoiceid: "INV-2025-002",
        amount: '$149.99' ,
      },
      {
        id: 3,
        companyname: "Garage Solutions Ltd",
        plan: "Basic",
        renewaldate: "28/10/2025",
        payment: "Credit Card (****8821)",
        status: clock,
        invoiceid: "INV-2025-003",
        amount: '$79.99' ,
      },

      {
        id: 4,
        companyname: "Premium Motors",
        plan: "Enterprise",
        renewaldate: "01/12/2025",
        payment: "Credit Card (****9156)",
        status: checkcircle,
        invoiceid: "INV-2025-004",
        amount: '$299.99' ,
      },

      
     
  ];

  
export default function Subscriptions(){
  const [opensubscription, setOpensubscription] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);

    const [collapsed, setCollapsed] = useState(false);
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const handleToggleSidebar = () => {
        if (window.innerWidth < 768) {
          setIsSidebarOpen((prev) => !prev);
        } else {
          setCollapsed((prev) => !prev);
        }
      };

      const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = () => setIsModalOpen(true);
const handleCloseModal = () => setIsModalOpen(false);

    
      return (
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* === Sidebar === */}
          <Sidebar
            collapsed={collapsed}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          {/* === Navbar with Toggle Button === */}
          <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Subscriptions & Billing"/>
    
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
        <h3 className="text-sm font-semibold text-gray-600">Monthly Recurring Revenue</h3>
          <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">AED749.97</h3>
      </div>
          <div className="bg-[#DBEAFE] p-2 rounded-md ">
          <img src={liquidityscore} alt="liquidity score" className="w-4 h-4" />
          </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-sm font-semibold text-[#16A34A]">+12.5% from last month </h2>
          </div>
         </div>

         {/* ==== card 2 ==== */}

      <div className="mt-3 bg-white border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Active Subscriptions</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-md font-bold text-black">3</h3>
      </div>
      <div className="bg-[#CAFFDC] p-2 rounded-md">
        <img src={arrowup} alt="currency" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2 justify-between">
      <h2 className="text-sm font-bold text-[#3E38DA]">4 total</h2>
      
    </div>
   
  </div>
 
        {/* ======== card 3 ========== */}
    <div className="mt-3 bg-white border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Failed Payments</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">2</h3>
      </div>
      <div className="bg-[#FEE2E2] p-2 rounded-md">
        <img src={attention} alt="active dealers" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <h2 className="text-sm font-bold text-[#E60015]">Requires attention</h2>
    </div>
  </div>

         {/* ====== card 4 ======= */}
     <div className="mt-3 bg-white border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-sm font-semibold text-gray-600">Active Coupons</h3>
    <div className="flex items-center justify-between gap-4 mt-1">
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg font-bold text-black">2</h3>
      </div>
      <div className="bg-[#F2E7FF] p-2 rounded-md">
        <img src={coupons} alt="chartbar" className="w-4 h-4" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <h2 className="text-sm font-bold text-[#16A34A]">168 total uses </h2>
    </div>
  </div>

  </div>

  <div className="flex flex-col lg:flex-row gap-4 mt-6">
  <div className="bg-white rounded-lg border border-gray-100 shadow p-4 flex-1">
  <div className="-mx-4 px-4 border-b pb-2 mb-4 flex flex-col lg:flex-row justify-between items-center gap-4">
  <h2 className="text-lg font-semibold text-gray-900 w-full lg:w-auto">
  Active Subscriptions
  </h2>


    {/* === export data Button === */}     
    <button className="flex items-center gap-2 bg-[#3E38DA] text-white px-4 py-2 rounded text-sm">
  <img src={exporticon} alt="export" className="w-4 h-4" />
  Export Data
</button>

  </div>


{/* ==== table === */}
<div className="bg-white rounded-lg border border-gray-100 shadow p-4 overflow-x-auto">
          <table className="min-w-[850px] w-full text-sm text-left border-collapse">
            <thead className="text-gray-600 border-b bg-[#ecf3fe]">
              <tr>
              <th className="font-semibold">COMPANY NAME</th>
                <th className="font-semibold">PLAN</th>
                <th className="font-semibold">RENEWAL DATE</th>
                <th className="font-semibold">PAYMENT METHOD</th>
                <th className="font-semibold">STATUS</th>
                <th className="font-semibold">INVOICE ID</th>
                <th className="font-semibold">AMOUNT</th>
                <th className="text-center font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dummyClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                    {/* company name */}
                  <td className="text-gray-700">{client.companyname}</td>

                 
               
               {/* client plan */}
               <td className="py-3">
               <div className="flex flex-col">
                    <div className="text-sm text-[#3E38DA] bg-[#DBEAFE] border rounded p-1">{client.plan}</div>
                    </div>
                  </td>

                  
                  {/* renewal date */}
                  <td>
                    <div className="flex flex-col  justify-center">
                        <h3 className="text-sm text-center text-gray-500">{client.renewaldate}</h3>
                    </div>
                  </td>
  
             {/* payment method */}
             <td>{client.payment}</td>

             {/* status */}
             <td>
             <img 
           src={client.status} 
           alt="status" 
           style={{ width: 20, height: 20 }} 
            />
            </td>
                 

            {/* invoice id */}
            <td>{client.invoiceid}</td>

         {/* amount */}
         <td>{client.amount}</td>
                  

                 
                  
                  {/* Action */}
                  <td className="text-center">
                    <button 
                    className="flex justify-center items-center mx-auto hover:opacity-80 transition">
                      <img src={download} alt="View" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
    
    <div className="mt-3 border rounded p-4">
    <div className="flex items-center justify-between" onClick={() => setOpensubscription(!opensubscription)}>
  <div className="flex items-center gap-2">
    <img src={trendup} alt="trend up" className="w-4 h-4"/>
    <h2 className="text-sm font-semibold text-black">Subscription Analytics</h2>
  </div>
  <img
          src={opensubscription ? dropdownup : dropdowndown}
          alt="dropdown arrow"
          className="w-4 h-4 transition-transform duration-200"
        />
  
</div>

        {/* === divider === */}
        <div className="mt-3  border-b border-[#EBEBEB]"></div>
        
{opensubscription && (
  <SubscriptionAnalytics/>

)}
  
    </div>


{/* ======== Billing Management ========= */}

    <div className="mt-3 border rounded p-4">
    <div className="flex items-center justify-between" onClick={() => setOpenBilling(!openBilling)}>
  <div className="flex items-center gap-2">
    <img src={billing} alt="billing" className="w-4 h-4"/>
    <h2 className="text-sm font-semibold text-black">Billing Management</h2>
  </div>
  <img
          src={openBilling ? dropdownup : dropdowndown}
          alt="dropdown arrow"
          className="w-4 h-4 transition-transform duration-200"
        />
  
</div>

        {/* === divider === */}
        <div className="mt-3  border-b border-[#EBEBEB]"></div>
        {openBilling && (
          <>
  
  {/* ===== failed payments =======*/}
<Failedpayments />


{/* ========== Dealer Communication Log ========= */}
<Dealercommunication/>

{/* ===== Coupons & Discounts ==== */}
<div className="flex items-center gap-2 mt-4">
    <img src={coupons} alt="coupons" className="w-4 h-4"/>
    <h2 className="text-sm font-semibold text-black">Coupons & Discounts</h2>   
  </div>

  {/* ======== WELCOME50 ======= */}
  <div className="border rounded mt-3  p-4 gap-3 bg-[#faf5ff]">
    <div className="flex flex-row items-center gap-3 justify-between">
      <div className="flex flex-row items-center gap-2">
      <h3 className="text-sm text-black ">WELCOME50</h3>
      <h3 className="text-sm text-[#028174] bg-[#CAFFDC] p-2 border rounded">active</h3>
      </div>

<div className="flex flex-row items-center ">
      <button onClick={handleOpenModal}
      className=" flex items-center gap-2 text-sm text-white px-3 py-2 bg-[#9333EA] border rounded">
      <img src={editcoupon} alt="edit coupon" className="w-4 h-4" />
      Edit</button>
    </div>
    

    </div>
    <h3 className="mt-2 text-gray-700">50% off first month</h3>
    <div className="flex flex-row gap-4 mt-2">
<h3 className=" text-gray-700">Usage:45/100</h3>
<h3 className="text-gray-500">Expires:31/12/2025</h3>
</div>
</div>

{/* ======== UPGRADE20 ===== */}
<div className="border rounded mt-3  p-4 gap-3 bg-[#faf5ff]">
    <div className="flex flex-row items-center gap-3 justify-between">
      <div className="flex flex-row items-center gap-2">
      <h3 className="text-sm text-black ">UPGRADE20</h3>
      <h3 className="text-sm text-[#028174] bg-[#CAFFDC] p-2 border rounded">active</h3>
      </div>

<div className="flex flex-row items-center ">
      <button className=" flex items-center gap-2 text-sm text-white px-3 py-2 bg-[#9333EA] border rounded">
      <img src={editcoupon} alt="edit coupon" className="w-4 h-4" />
      Edit</button>
    </div>
    

    </div>
    <h3 className="mt-2 text-gray-700">20% off upgrade</h3>
    <div className="flex flex-row gap-4 mt-2">
<h3 className=" text-gray-700">Usage:23/50</h3>
<h3 className="text-gray-500">Expires:30/11/2025</h3>
</div>
</div>

{/* ======== SUMMER2024 ======== */}
<div className="border rounded mt-3  p-4 gap-3 bg-[#ecf3fe]">
    <div className="flex flex-row items-center gap-3 justify-between">
      <div className="flex flex-row items-center gap-2">
      <h3 className="text-sm text-black ">SUMMER2024 </h3>
      <h3 className="text-sm text-black bg-[#F3F4F6] p-2 border rounded">expired</h3>
      </div>
    </div>

    <h3 className="mt-2 text-gray-700">30% off</h3>
    <div className="flex flex-row gap-4 mt-2">
<h3 className=" text-gray-700">Usage:100/100</h3>
<h3 className="text-gray-500">Expires:30/09/2024</h3>
</div>
</div>

<div className="flex-1 pr-0 md:pr-6 md:border-gray-300 mt-2">
      <div className="border-2 border-dashed border-gray-300 rounded-lg h-20 flex flex-col items-center justify-center">
        <span className="text-gray-700">
        + Create New Coupon </span>
      </div>
      </div>

</>
        )}
</div>


          </main>
          {isModalOpen && <EditCoupon onClose={handleCloseModal} />}

          </div>
      )
}