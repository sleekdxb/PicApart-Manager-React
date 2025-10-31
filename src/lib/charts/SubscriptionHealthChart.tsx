import React from "react";
import newmrr from '../../assets/images/new mrr.png';
import totalmrr from '../../assets/images/total mrr.png';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", newMRR: 380, total: 380 },
  { month: "Feb", newMRR: 400, total: 550 },
  { month: "Mar", newMRR: 550, total: 580 },
  { month: "Apr", newMRR: 580, total: 600 },
  { month: "May", newMRR: 640, total: 680 },
  { month: "June", newMRR: 720, total: 740 },
  { month: "July", newMRR: 760, total: 780 },
  { month: "Aug", newMRR: 800, total: 860 },
  { month: "Sept", newMRR: 900, total: 940 },
  { month: "Oct", newMRR: 990, total: 1030 },
  { month: "Nov", newMRR: 1060, total: 1100 },
  { month: "Dec", newMRR: 1130, total: 1180 },
];

export default function SubscriptionHealthChart() {
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
        <ComposedChart
          data={data}
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
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />

          {/* === Single Y Axis for both === */}
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            domain={[300, 1200]}
            ticks={[400, 600, 800, 1000, 1200]}
          >
            <g transform="translate(20, 100)">
              <image href={newmrr} width={10} height={10} />
              <text
                x={10}
                y={35}
                textAnchor="middle"
                fill="#000"
                fontSize={10}
                transform="rotate(-90 10 35)"
              >
                New MRR
              </text>
            </g>
          </YAxis>

          {/* === Total MRR Label on Right === */}
          <g transform="translate(410, 130)">
            <image href={totalmrr} x={-2} y={-25} width={10} height={10} />
            <text
              x={2}
              y={10}
              textAnchor="middle"
              fill="#000"
              fontSize={10}
              transform="rotate(90 2 10)"
            >
              Total MRR
            </text>
          </g>

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
            yAxisId="left"
            dataKey="newMRR"
            barSize={18}
            radius={[4, 4, 0, 0]}
            fill="url(#barGradient)"
          />

          {/* === Line (Total MRR) === */}
          <Area
            yAxisId="left" 
            type="monotone"
            dataKey="total"
            stroke="#028174"
            strokeWidth={2.5}
            fill="none"
            connectNulls={true}
            dot={false}
            activeDot={{ r: 5, fill: "#028174" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

