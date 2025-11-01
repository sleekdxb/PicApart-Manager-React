type MetricStatCardProps = {
  title: string;
  value: string;
  deltaText?: string;
  deltaClassName?: string; // e.g., text-[#16A34A]
};

export default function MetricStatCard({ title, value, deltaText, deltaClassName }: MetricStatCardProps) {
  return (
    <div className="border rounded p-2 mt-3 bg-[#F9FAFB]">
      <h3 className="text-sm text-gray-700">{title}</h3>
      <h3 className="text-md text-black font-semibold mt-2">{value}</h3>
      {deltaText ? (
        <h3 className={`text-sm mt-2 ${deltaClassName ?? "text-[#16A34A]"}`}>{deltaText}</h3>
      ) : null}
    </div>
  );
}


