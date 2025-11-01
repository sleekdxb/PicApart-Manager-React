import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
    { stage: "Requests",stagevalue:1000, value: 1200 },
    { stage: "Notified", stagevalue:900,value: 1000 },
    { stage: "Clicks", stagevalue:800,value: 920 },
    { stage: "Contacts", stagevalue:430,value: 720 },
  ];


export default function EngagementFunnelChart() {
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
            data={data}
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
              domain={[400, 1200]}
              ticks={[400, 600, 800, 1000, 1200]}
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
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
