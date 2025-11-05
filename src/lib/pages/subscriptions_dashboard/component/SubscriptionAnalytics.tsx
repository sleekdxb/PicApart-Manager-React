
export default function SubscriptionAnalytics(){
    return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* ======= card 1 ===== */}
    <div className="border rounded mt-2 p-2 bg-[#F8FAFC]">
        <h3 className="text-sm text-black font-semibold">MRR by Plan Type</h3>
        <div className="flex flex-row  justify-between mt-3 px-3">
            {/* === Enterprise === */}
      <h3 className="font-semibold text-sm text-gray-500">Enterprise</h3>
      <h3 className="font-semibold text-sm text-black">$599.98</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#3E38DA] h-2 rounded-full"
    style={{ width: "84%" }}  
  >   
  </div>
      </div>

{/* ===== Professional === */}
      <div className="flex flex-row  justify-between mt-3 px-3">
      <h3 className="font-semibold text-sm text-gray-500">Professional</h3>
      <h3 className="font-semibold text-sm text-black">$149.99</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#16A34A] h-2 rounded-full"
    style={{ width: "64%" }}  
  >   
  </div>
      </div>

{/* ======== Basic ======== */}
      <div className="flex flex-row  justify-between mt-3 px-3">
      <h3 className="font-semibold text-sm text-gray-500">Basic</h3>
      <h3 className="font-semibold text-sm text-black">$0.00</h3>
</div>
{/* === progress bar === */}
<div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
  <div
    className="bg-[#16A34A] h-2 rounded-full"
    style={{ width: "0%" }}  
  >   
  </div>
      </div>
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
    )
}

