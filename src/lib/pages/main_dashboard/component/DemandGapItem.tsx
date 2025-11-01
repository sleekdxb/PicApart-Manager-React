type DemandGapItemProps = {
  title: string;
  percentage: number; // used for bar width (0-100)
  barColorHex?: string; // default #F9AE13
  displayValue?: number; // optional numeric label to show instead of percentage
  displaySuffix?: string; // e.g., 'records'
};

export default function DemandGapItem({ title, percentage, barColorHex = "#F9AE13", displayValue, displaySuffix }: DemandGapItemProps) {
  return (
    <div>
      <div className="flex flex-row  justify-between mt-3 px-3">
        <h3 className="font-semibold text-sm">{title}</h3>
        <h3 className="font-semibold text-sm">
          {displayValue != null ? (
            <>{displayValue} {displaySuffix || ''}</>
          ) : (
            <>{percentage}% demand gap</>
          )}
        </h3>
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


