type PlanRevenueRowProps = {
  label: string;
  amount: string;
  barColorHex: string;
  percentage: number; // 0-100
};

export default function PlanRevenueRow({ label, amount, barColorHex, percentage }: PlanRevenueRowProps) {
  return (
    <div>
      <div className="flex flex-row  justify-between mt-3 px-3">
        <h3 className="font-semibold text-sm text-gray-500">{label}</h3>
        <h3 className="font-semibold text-sm text-black">{amount}</h3>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-3 ">
        <div
          className="h-2 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: barColorHex }}
        >
        </div>
      </div>
    </div>
  );
}


