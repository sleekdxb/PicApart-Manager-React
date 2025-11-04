type ActivityMetricRowProps = {
  iconSrc: string;
  iconBgClassName: string; // e.g., bg-[#DBEAFE]
  title: string;
  periodText: string;
  valueText: string;
  valueClassName: string; // e.g., text-[#3E38DA]
};

export default function ActivityMetricRow({ iconSrc, iconBgClassName, title, periodText, valueText, valueClassName }: ActivityMetricRowProps) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className={`border rounded p-2 ${iconBgClassName}`}>
        <img src={iconSrc} alt={title} className="w-4 h-4" />
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-sm font-semibold text-black">{title}</h3>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-sm text-gray-700">{periodText}</h3>
          <h3 className={`text-sm font-semibold ${valueClassName}`}>{valueText}</h3>
        </div>
      </div>
    </div>
  );
}


