import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart, LabelList } from "recharts";

type EngagementFunnelPoint = {
  stage: string;
  value: number;
};

interface EngagementFunnelChartProps {
  data?: EngagementFunnelPoint[];
}

export default function EngagementFunnelChart({ data }: EngagementFunnelChartProps) {
  // Only use data if it exists and has valid entries
  const hasValidData = data && data.length > 0 && data.some((point) => point.value > 0);
  
  // If no valid data, create empty data points with value 0 for all stages
  let chartData: EngagementFunnelPoint[];
  if (!hasValidData) {
    chartData = [
      { stage: "Request Part", value: 0 },
      { stage: "Notified", value: 0 },
      { stage: "Part Click", value: 0 },
      { stage: "Contacts", value: 0 },
    ];
  } else {
    chartData = data;
  }
  
  const values = chartData.map((point) => point.value).filter((val) => Number.isFinite(val));
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 0;
  const padding = values.length ? Math.max(10, Math.round((maxValue - minValue) * 0.1)) : 10;
  const domainMin = 0; // Always start from 0
  const domainMax = maxValue > 0 
    ? Math.ceil((maxValue + padding) / 10) * 10 
    : 100; // Default to 100 if all values are 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full h-80">
      {/* === Title Section === */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-black">
          Engagement Funnel
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
      <div className="h-[90%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="funnelGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DBEAFE" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="stage"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[domainMin, domainMax]}
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />

            {/* Area under curve */}
            <Area
              type="natural"
              dataKey="value"
              stroke="#028174"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#funnelGradient)"
              activeDot={{ r: 5, fill: "#16A34A" }}
            >
              <LabelList
                dataKey="value"
                position="top"
                style={{ fill: "#1F2937", fontSize: 12, fontWeight: 600 }}
                formatter={(val: unknown) => (typeof val === "number" ? val.toString() : "")}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
