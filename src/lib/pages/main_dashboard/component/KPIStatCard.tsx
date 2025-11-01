import type { ReactNode } from "react";

type KPIStatCardProps = {
  title: string;
  value: ReactNode;
  rightIconSrc: string;
  rightIconAlt?: string;
  rightIconBgClassName: string; // e.g. bg-[#DBEAFE]
  rightIconSizeClassName?: string; // e.g. w-4 h-4
  containerClassName?: string;
  children?: ReactNode; // footer/extra content
};

export default function KPIStatCard({
  title,
  value,
  rightIconSrc,
  rightIconAlt,
  rightIconBgClassName,
  rightIconSizeClassName,
  containerClassName,
  children,
}: KPIStatCardProps) {
  return (
    <div className={containerClassName ?? "mt-3 border rounded-lg shadow p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"}>
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <div className="flex items-center justify-between gap-4 mt-1">
        <div className="flex items-baseline gap-1">{value}</div>
        <div className={`p-2 rounded-md ${rightIconBgClassName}`}>
          <img src={rightIconSrc} alt={rightIconAlt ?? title} className={rightIconSizeClassName ?? "w-4 h-4"} />
        </div>
      </div>
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}


