import {useState} from 'react';

import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import liquidityscore from "../../../assets/images/liquidityscore.png";
import arrowup from "../../../assets/images/arrowup.png";
import attention from "../../../assets/images/revenue risk.png";
import coupons from "../../../assets/images/coupons.png";
import download from "../../../assets/images/download.png";
import checkcircle from "../../../assets/images/checkcircle.png";
import exporticon from "../../../assets/images/export.png";
import clock from "../../../assets/images/Clock.png";
import trendup from "../../../assets/images/TrendUp.png";
import SubscriptionKPIStatCard from "./component/SubscriptionKPIStatCard";
import PlanRevenueRow from "./component/PlanRevenueRow";



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
    const [collapsed, setCollapsed] = useState(false);
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const handleToggleSidebar = () => {
        if (window.innerWidth < 768) {
          setIsSidebarOpen((prev) => !prev);
        } else {
          setCollapsed((prev) => !prev);
        }
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
          <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Subscriptions & Billing" />
    
          {/* === Main Content === */}
          
             <main
            className={`p-6 mt-10 transition-all duration-300 ${
              collapsed ? "md:ml-20" : "md:ml-64"
            }`}
          >

    {/* ===============four cards section ============== */}
        {/* ==== KPI cards === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SubscriptionKPIStatCard
            title="Monthly Recurring Revenue"
            value={<h3 className="text-lg font-bold text-black">AED749.97</h3>}
            rightIconSrc={liquidityscore}
            rightIconAlt="liquidity score"
            rightIconBgClassName="bg-[#DBEAFE]"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#16A34A]">+12.5% from last month </h2>
            </div>
          </SubscriptionKPIStatCard>

          <SubscriptionKPIStatCard
            title="Active Subscriptions"
            value={<h3 className="text-md font-bold text-black">3</h3>}
            rightIconSrc={arrowup}
            rightIconAlt="currency"
            rightIconBgClassName="bg-[#CAFFDC]"
          >
            <div className="flex items-center gap-2 mt-2 justify-between">
              <h2 className="text-sm font-bold text-[#3E38DA]">4 total</h2>
            </div>
          </SubscriptionKPIStatCard>

          <SubscriptionKPIStatCard
            title="Failed Payments"
            value={<h3 className="text-lg font-bold text-black">2</h3>}
            rightIconSrc={attention}
            rightIconAlt="active dealers"
            rightIconBgClassName="bg-[#FEE2E2]"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#E60015]">Requires attention</h2>
            </div>
          </SubscriptionKPIStatCard>

          <SubscriptionKPIStatCard
            title="Active Coupons"
            value={<h3 className="text-lg font-bold text-black">2</h3>}
            rightIconSrc={coupons}
            rightIconAlt="chartbar"
            rightIconBgClassName="bg-[#F2E7FF]"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#16A34A]">168 total uses </h2>
            </div>
          </SubscriptionKPIStatCard>
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
    <div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <img src={trendup} alt="trend up" className="w-4 h-4"/>
    <h2 className="text-sm font-semibold text-black">Subscription Analytics</h2>
  </div>

  
</div>

        {/* === divider === */}
        <div className="mt-3  border-b border-[#EBEBEB]"></div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* ======= card 1 ===== */}
      <div className="border rounded mt-2 p-2 bg-[#F8FAFC]">
        <h3 className="text-sm text-black font-semibold">MRR by Plan Type</h3>
        <PlanRevenueRow label="Enterprise" amount="$599.98" barColorHex="#3E38DA" percentage={84} />
        <PlanRevenueRow label="Professional" amount="$149.99" barColorHex="#16A34A" percentage={64} />
        <PlanRevenueRow label="Basic" amount="$0.00" barColorHex="#16A34A" percentage={0} />
      </div>

      {/*========= Churn Analysis card ========= */}
      <div className="border rounded mt-2 p-2 bg-[#F8FAFC]">
        <h3 className="text-sm text-black font-semibold">Churn Analysis</h3>
        <div className="flex flex-col items-center mt-2">
            <h3 className="text-md font-semibold text-[#E60015]">8.5%</h3>
            <h3 className="mt-2 text-sm font-semibold text-gray-700">Monthly Churn Rate</h3>
        </div>
        {/* === divider === */}
        <div className="mt-3  border-b border-[#EBEBEB]"></div>
        <div className="flex flex col justify-between">
            <h3 className="text-sm text-gray-700">Last 30 days:</h3>
            <h3 className="text-sm text-black">3 cancellations</h3>
        </div>
        <div className="flex flex col justify-between mt-3">
            <h3 className="text-sm text-gray-700">Previous period:</h3>
            <h3 className="text-sm text-black">2 cancellations</h3>
        </div>

</div>
{/* ========== Upgrade/Downgrade Patterns ======== */}
<div className="border rounded mt-2 p-2 bg-[#F8FAFC]">
      <h3 className="text-sm text-black font-semibold">Upgrade/Downgrade Patterns</h3>
      <div className="flex flex col justify-between mt-3">
            <h3 className="text-sm text-gray-700">Upgrades</h3>
            <h3 className="text-sm text-[#16A34A]">15.2%</h3>
        </div>
        <h3 className="text-sm text-gray-700 font-semibold mt-3">5 customers upgraded this month</h3>
        
      {/* ==== divider === */}
      <div className="mt-3  border-b border-[#EBEBEB]"></div>
      <div className="flex flex col justify-between mt-3">
            <h3 className="text-sm text-gray-700">Downgrades</h3>
            <h3 className="text-sm text-[#EA580C]">3.2%</h3>
        </div>
        <h3 className="text-sm text-gray-700 font-semibold mt-3">1 customer downgraded this month</h3>
      </div>
      </div>
      
    </div>

          </main>
          </div>
      )
}