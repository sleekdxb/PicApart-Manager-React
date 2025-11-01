type AlertItemProps = {
  iconSrc: string;
  title: string;
  subtitle: string;
  iconBgClassName: string; // e.g. bg-[#FEE2E2]
};

export default function AlertItem({ iconSrc, title, subtitle, iconBgClassName }: AlertItemProps) {
  return (
    <div className="flex items-center gap-3 mt-4 ">
      <div className={`p-2 ${iconBgClassName}`}>
        <img src={iconSrc} alt={title} className="w-5 h-5" />
      </div>
      <div className="flex-col items-center">
        <h3 className="text-sm text-black font-bold">{title}</h3>
        <h3 className="text-sm text-gray-700">{subtitle}</h3>
      </div>
    </div>
  );
}


