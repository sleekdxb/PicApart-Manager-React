type QuickActionItemProps = {
  title: string;
  iconSrc: string;
  badgeSrc?: string;
  containerClassName?: string;
};

export default function QuickActionItem({ title, iconSrc, badgeSrc, containerClassName }: QuickActionItemProps) {
  return (
    <div className={containerClassName ?? "relative border rounded p-4 mt-4 bg-[#F4F9FF] flex flex-col items-center justify-center text-center h-24"}>
      {badgeSrc ? (
        <img
          src={badgeSrc}
          alt="badge"
          className="w-4 h-4 absolute top-2 right-2"
        />
      ) : null}
      <img src={iconSrc} alt={title} className="w-4 h-4 mb-2" />
      <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
    </div>
  );
}


