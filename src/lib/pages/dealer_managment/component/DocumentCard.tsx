type DocumentCardProps = {
  iconSrc: string;
  title: string;
  subText: string;
  showStatus?: boolean;
  onView?: () => void;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  reasonValue?: string;
  onReasonChange?: (value: string) => void;
  statusOptions?: string[];
  reasonOptions?: string[];
};

export default function DocumentCard({ iconSrc, title, subText, showStatus = true, onView, statusValue, onStatusChange, reasonValue, onReasonChange, statusOptions, reasonOptions }: DocumentCardProps) {
  const defaultStatusOptions = ["Approved", "Pending", "Rejected", "Amendment"];
  const defaultReasonOptions = [
    "Invalid unclear information",
    "update to be done",
    "Misuseof the platform",
    "Completly Flagged Out",
  ];
  const finalStatusOptions = statusOptions && statusOptions.length > 0 ? statusOptions : defaultStatusOptions;
  const finalReasonOptions = reasonOptions && reasonOptions.length > 0 ? reasonOptions : defaultReasonOptions;
  return (
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={iconSrc} alt="doc" className="w-6 h-6" />
          <div className="flex flex-col">
            <h3 className="text-sm text-[#028174] font-semibold">{title}</h3>
            <h3 className="text-sm text-gray-700">{subText}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {showStatus ? (
            <>
              <select
                className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none"
                value={statusValue ?? ""}
                onChange={(e) => onStatusChange?.(e.target.value)}
              >
                <option value="">Status</option>
                {finalStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {(statusValue === 'Rejected') ? (
                <select
                  className="px-4 py-2 text-sm text-[#028174] border rounded border-[#028174] bg-white cursor-pointer focus:outline-none"
                  value={reasonValue ?? ""}
                  onChange={(e) => onReasonChange?.(e.target.value)}
                >
                  <option value="">Reason</option>
                  {finalReasonOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : null}
            </>
          ) : null}
          <button onClick={onView} className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">
            View
          </button>
        </div>
      </div>
    </div>
  );
}


