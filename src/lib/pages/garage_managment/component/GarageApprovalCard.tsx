type GarageApprovalCardProps = {
  leftIconSrc: string;
  title: string;
  statusText: string;
  statusClassName: string; // e.g. text-[#16A34A] bg-[#CAFFDC]
  tradeLicenseIconSrc: string;
  locationIconSrc: string;
  locationText: string;
  contactIconSrc: string;
  contactText: string;
  rightStatusText: string;
  onRightStatusClick?: () => void;
  onEyeClick?: () => void;
  eyeIconSrc?: string;
  tags: string[];
};

export default function GarageApprovalCard({
  leftIconSrc,
  title,
  statusText,
  statusClassName,
  tradeLicenseIconSrc,
  locationIconSrc,
  locationText,
  contactIconSrc,
  contactText,
  rightStatusText,
  onRightStatusClick,
  onEyeClick,
  eyeIconSrc,
  tags,
}: GarageApprovalCardProps) {
  return (
    <div className="border rounded mt-3 p-2 relative">
      <div className="flex flex-row items-center justify-between gap-3 mb-4">
        <div className="flex flex-row items-center gap-2">
          <img src={leftIconSrc} alt="icon" className="w-4 h-4" />
          <h3 className="text-sm text-black font-semibold">{title}</h3>
          <button className={`text-sm px-3 py-2 ${statusClassName}`}>{statusText}</button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-sm text-gray-700 font-semibold">Trade License:</h3>
          <img src={tradeLicenseIconSrc} alt="trade-license" className="w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-3 mb-4">
        <div className="flex flex-row items-center gap-2">
          <img src={locationIconSrc} alt="location" className="w-4 h-4" />
          <h3 className="text-sm text-gray-700">{locationText}</h3>
          <img src={contactIconSrc} alt="contact" className="w-4 h-4" />
          <h3 className="text-sm text-gray-700">{contactText}</h3>
        </div>
        <button onClick={onRightStatusClick} className="text-sm text-gray-700">{rightStatusText}</button>
      </div>
      <div className="flex flex-row items-center gap-2 flex-wrap mb-6">
        {tags.map((t) => (
          <button key={t} className="px-3 py-2 border rounded-full text-[#3E38DA] bg-[#DBEAFE]">{t}</button>
        ))}
      </div>
      {/* Eye icon positioned at bottom-right corner */}
      {onEyeClick && eyeIconSrc && (
        <button 
          onClick={onEyeClick} 
          className="absolute bottom-2 right-2 flex items-center justify-center hover:opacity-80 transition cursor-pointer"
          title="View Garage Profile"
        >
          <img src={eyeIconSrc} alt="View" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}


