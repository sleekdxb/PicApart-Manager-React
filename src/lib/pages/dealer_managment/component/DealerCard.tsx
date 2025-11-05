import StarRating from "./StarRating";

type DealerCardProps = {
  name: string;
  email: string;
  rating: number; // 0-5
  metrics: Array<{ label: string; value: string }>; // e.g., [{label:'Requests', value:'142'}]
  planLabel: string; // e.g., 'Premium' | 'Pro' | 'Basic'
  planClassName: string; // full class list e.g., 'px-2 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded'
  onViewClick?: () => void; // Optional handler for eye icon click
  eyeIcon?: string; // Optional eye icon path
};

export default function DealerCard({ name, email, rating, metrics, planLabel: _planLabel, planClassName: _planClassName, onViewClick, eyeIcon }: DealerCardProps) {
  return (
    <div className="border rounded mt-3 shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md relative">
      {/* Eye icon in bottom-left corner */}
      {onViewClick && eyeIcon && (
        <button 
          onClick={onViewClick}
          className="absolute bottom-4 left-4 flex justify-center items-center hover:opacity-80 transition z-10"
          title="View Details"
        >
          <img src={eyeIcon} alt="View" className="w-5 h-5" />
        </button>
      )}
      
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-black">{name}</h3>
        <StarRating rating={rating} />
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mt-3">{email}</h3>

      <div className="mt-3">
        <h3 className="font-semibold text-sm text-black">Activity Metrics</h3>
      </div>
      <div className={`mt-2 flex gap-6 ${onViewClick && eyeIcon ? 'mb-8' : ''}`}>
        <div className="flex flex-col gap-1">
          {metrics.slice(0, 2).map((m) => (
            <h3 key={m.label} className="text-sm text-gray-700">{m.label}:{m.value}</h3>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {metrics.slice(2, 4).map((m) => (
            <h3 key={m.label} className="text-sm text-gray-700">{m.label}: {m.value}</h3>
          ))}
        </div>
      </div>
    </div>
  );
}


