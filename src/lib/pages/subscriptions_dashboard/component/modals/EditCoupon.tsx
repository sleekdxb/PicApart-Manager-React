import React from "react";

interface EditCouponProps {
  onClose: () => void;
}

const EditCoupon: React.FC<EditCouponProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //add api logic for editing  data
    // const formData = new FormData(e.currentTarget);
    // const editData = Object.fromEntries(formData.entries());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Coupon
        </h2>

        {/* === divider === */}
        <div className="mt-3  border-b border-[#EBEBEB]"></div>
        

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
            <label className="block mb-1 font-medium text-gray-500">Coupon Code</label>
            <input
              name="coupon code"
              type="text"
              required
              placeholder="WELCOME50"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black focus:outline-none"
            />
          </div>

         

          <div>
            <label className="block mb-1 font-medium text-gray-500">Discount Description</label>
            <input
              name="discount description"
              type="text"
              required
              placeholder="50% off first month"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black focus:outline-none"
            />
          </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 font-medium">Current Usage</label>
            <input
              name="current usage"
              type="number"
              required
              placeholder="45"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Max(Usage)</label>
            <input
              name="usage"
              type="number"
              required
              placeholder="100"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black"
            />
          </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Expiry Date</label>
            <input
              name="expiry date"
              type="date"
              required
              placeholder="31/12/2025"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              required
              defaultValue=""
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-black focus:outline-none"
            >
            <option value="" disabled hidden>
                Active
              </option>
              <option>Active</option>
            </select>
          </div>

         

         

          

        

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md  border-[#028174] text-[#028174] "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#028174] text-white rounded-md "
            >
              Save Changes
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupon;
