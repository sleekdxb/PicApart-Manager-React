
import dealercommunication from "../../../../assets/images/dealer communication.png";
import checkcircle from "../../../../assets/images/checkcircle.png";

export default function Dealercommunication() {
    return (
        <div className="mt-4">
<div className="flex items-center gap-2  ">
    <img src={dealercommunication} alt="dealer communication" className="w-4 h-4"/>
    <h2 className="text-sm font-semibold text-black">Dealer Communication Log</h2>
    
  </div>
  <div className="border rounded mt-4 p-3 bg-[#ecf3fe]">
  <div className="flex flex-row items-center justify-between gap-3 mb-4">
            <div className="flex flex-row items-center gap-2">
              <div className="px-3 py-2 border rounded bg-[#DBEAFE]">
            <img src={dealercommunication} alt="dealer communication" className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
            <h3 className="text-sm text-black font-semibold">Payment reminder sent</h3>
            <h3 className="text-sm text-gray-700">Sent payment reminder to Budget Auto Parts</h3>

            </div>
            </div>

            <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-gray-700 font-semibold">2 hours ago</h3>
              
        
            </div>
        </div>

           {/* === divider === */}
           <div className="mt-3  border-b border-[#EBEBEB]"></div>

           <div className="flex flex-row items-center justify-between gap-3 mb-4 mt-4">
            <div className="flex flex-row items-center gap-2">
              <div className="px-3 py-2 border rounded bg-[#CAFFDC]">
            <img src={checkcircle} alt="checkcircle" className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
            <h3 className="text-sm text-black font-semibold">Payment confirmed</h3>
            <h3 className="text-sm text-gray-700">AutoParts Deluxe payment processed successfully</h3>

            </div>
            </div>

            <div className="flex flex-row items-center gap-2">
            <h3 className="text-sm text-gray-700 font-semibold">1 day ago</h3>
            
           
        </div>
        </div>
        </div>
</div>
    )
}
