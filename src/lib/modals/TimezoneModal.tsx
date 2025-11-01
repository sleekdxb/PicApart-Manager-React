import { useState } from "react";

interface TimezoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (timezone: string) => void;
}

const timezones = Intl.supportedValuesOf("timeZone");

export default function TimezoneModal({
  isOpen,
  onClose,
  onSave,
}: TimezoneModalProps) {
  const [selectedTimezone, setSelectedTimezone] = useState("");


  if (!isOpen) return null; 

  const handleSave = () => {
    if (selectedTimezone) {
      onSave(selectedTimezone);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 ">
        {/* === Modal Header === */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Configure Timezone
          </h2>
          <button
            onClick={onClose}
            className="text-black  text-lg"
          >
             x
          </button>
        </div>

        {/* === Form === */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Timezone
          </label>

          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="w-full border border-gray-500 rounded-md p-2 text-gray-700 bg-gray-100 focus:outline-none"

          >
        {timezones.map((tz) => (
       <option key={tz} value={tz}>
       {tz}
      </option>
      ))}
     </select>     
        </div>

        {/* === Buttons === */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50 font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}