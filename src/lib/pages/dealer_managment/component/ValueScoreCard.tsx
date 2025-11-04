type ValueScoreCardProps = {
  title: string;
  score: string; // e.g., '4/5'
  subtitle: string;
};

export default function ValueScoreCard({ title, score, subtitle }: ValueScoreCardProps) {
  return (
    <div className="mt-4 border rounded shadow p-3 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-black">{title}</h3>
        <h3 className="font-semibold text-sm text-[#028174]">{score}</h3>
      </div>
      <h3 className="font-semibold text-sm text-gray-700 mt-3">{subtitle}</h3>
    </div>
  );
}


