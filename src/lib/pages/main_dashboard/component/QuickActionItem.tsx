type QuickActionItemProps = {
  title: string;
  iconSrc: string;
  count?: number;
  containerClassName?: string;
};

export default function QuickActionItem({ title, iconSrc, count = 0, containerClassName }: QuickActionItemProps) {
  const displayCount = Number.isFinite(count) ? count : 0;

  return (
    <div className={containerClassName ?? "relative border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24"}>
      <span className="absolute top-2 right-2 inline-flex min-w-[1.5rem] justify-center rounded-full bg-[#1D4ED8] px-2 py-[2px] text-xs font-semibold text-white">
        {displayCount}
      </span>
      <img src={iconSrc} alt={title} className="w-4 h-4 mb-2" />
      <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
    </div>
  );
}

