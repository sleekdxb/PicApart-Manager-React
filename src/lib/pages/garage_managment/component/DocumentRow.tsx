type DocumentRowProps = {
  iconSrc: string;
  title: string;
  statusText?: string; // e.g., Valid
  statusClassName?: string; // e.g., text-[#028174] bg-[#CAFFDC]
  subText: string; // e.g., Expires: ...
  onView?: () => void;
};

export default function DocumentRow({ iconSrc, title, statusText, statusClassName, subText, onView }: DocumentRowProps) {
  return (
    <div className="border rounded p-3 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <img src={iconSrc} alt="doc" className="w-6 h-6" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h3 className="text-sm text-[#028174] font-semibold">{title}</h3>
              {statusText ? (
                <h3 className={`text-sm border rounded px-1 ${statusClassName ?? "text-[#028174] bg-[#CAFFDC]"}`}>{statusText}</h3>
              ) : null}
            </div>
            <h3 className="text-sm text-gray-700">{subText}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button onClick={onView} className="text-sm px-4 py-2 text-white bg-[#028174] border rounded">View</button>
        </div>
      </div>
    </div>
  );
}


