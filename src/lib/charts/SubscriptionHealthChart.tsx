import totalmrr from '../../assets/images/total mrr.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type SubscriptionHealthPoint = {
  month: string;
  total: number;
};

interface SubscriptionHealthChartProps {
  data?: SubscriptionHealthPoint[];
}

export default function SubscriptionHealthChart({ data }: SubscriptionHealthChartProps) {
  // Only use data if it exists and has valid entries
  const hasValidData = data && data.length > 0 && data.some((entry) => entry.total > 0);
  
  // If no valid data, create empty data points with default months and value 0
  let chartData: Array<{ month: string; total: number; monthLabel: string }>;
  if (!hasValidData) {
    const defaultMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    chartData = defaultMonths.map((month) => ({
      month,
      total: 0,
      monthLabel: month,
    }));
  } else {
    chartData = data.map((entry) => ({
      ...entry,
      monthLabel: entry.month,
    }));
  }

  const totals = chartData.map((pt) => pt.total).filter((value) => Number.isFinite(value));
  const minTotal = totals.length ? Math.min(...totals) : 0;
  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const yPadding = totals.length ? Math.max(20, Math.round((maxTotal - minTotal) * 0.1)) : 20;
  const domainMin = 0; // Always start from 0
  const domainMax = maxTotal > 0 
    ? Math.ceil((maxTotal + yPadding) / 10) * 10 
    : 100; // Default to 100 if all values are 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full h-80">
      {/* === Header === */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-black">
          Subscription Health
        </h3>
        <div className="flex space-x-2 text-xs text-gray-500">
          <button className="px-2 py-[2px] rounded-md border bg-[#DBEAFE] border-gray-300 text-gray-600 hover:bg-gray-100">
            7D
          </button>
          <button className="px-2 py-[2px] rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
            30D
          </button>
          <button className="px-2 py-[2px] rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
            90D
          </button>
        </div>
      </div>

      {/* === Chart === */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          barCategoryGap="30%"
        >
          {/* === Gradient for bars === */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#87c4be" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#87c4be" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          {/* === X Axis === */}
          <XAxis
            dataKey="monthLabel"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />

          {/* === Y Axis === */}
          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            domain={[domainMin, domainMax]}
            allowDecimals={false}
          >
            <g transform="translate(20, 100)">
              <image href={totalmrr} width={10} height={10} />
              <text
                x={10}
                y={35}
                textAnchor="middle"
                fill="#000"
                fontSize={10}
                transform="rotate(-90 10 35)"
              >
                Total
              </text>
            </g>
          </YAxis>

          {/* === Tooltip === */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />

          {/* === Bars === */}
          <Bar
            dataKey="total"
            barSize={18}
            radius={[4, 4, 0, 0]}
            fill="url(#barGradient)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
