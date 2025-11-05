import revenuerisk from "../../../../assets/images/revenue risk.png";

export default function Failedpayments() {
  return (
    <div className="mt-4">
      {/* === Section Header === */}
      <div className="flex items-center gap-2">
        <img src={revenuerisk} alt="billing" className="w-4 h-4" />
        <h2 className="text-sm font-semibold text-black">Failed Payments Queue</h2>
      </div>

      {/* ========= Budget Auto Parts ========= */}
      <div className="border rounded mt-3 p-4 gap-3 bg-[#FECACA]">
        <div className="flex flex-row items-center gap-3 justify-between">
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-black">Budget Auto Parts</h3>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button className="text-sm text-white px-3 py-2 bg-[#3E38DA] border rounded">Retry Now</button>
            <button className="text-sm text-white px-3 py-2 bg-[#028174] border rounded">Contact</button>
          </div>
        </div>
        <h3 className="mt-2 text-gray-700">Amount: $79.99 | Attempts: 2</h3>
        <h3 className="mt-2 text-[#D40000]">Reason: Insufficient funds</h3>
        <h3 className="mt-2 text-black">Next retry: 26/10/2025</h3>
      </div>

      {/* ===== Express Garage === */}
      <div className="border rounded mt-3 p-4 gap-3 bg-[#FECACA]">
        <div className="flex flex-row items-center gap-3 justify-between">
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-black">Express Garage</h3>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button className="text-sm text-white px-3 py-2 bg-[#3E38DA] border rounded">Retry Now</button>
            <button className="text-sm text-white px-3 py-2 bg-[#028174] border rounded">Contact</button>
          </div>
        </div>
        <h3 className="mt-2 text-gray-700">Amount: $149.99 | Attempts: 1</h3>
        <h3 className="mt-2 text-[#D40000]">Reason: Card expired</h3>
        <h3 className="mt-2 text-black">Next retry: 27/10/2025</h3>
      </div>
    </div>
  );
}
