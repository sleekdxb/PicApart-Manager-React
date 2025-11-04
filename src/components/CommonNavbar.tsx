import searchIcon from '../assets/images/searchIcon2.png';
import message from '../assets/images/message.png';
import notification from '../assets/images/notification.png';
import userprofile from '../assets/images/user_profile.png';

export interface CommonNavbarProps {
  onToggleSidebar: () => void;
  collapsed: boolean;
  title: string;
}

export default function CommonNavbar({ onToggleSidebar, collapsed, title }: CommonNavbarProps) {
  return( 
    
  <header
        className={`fixed top-0 left-0 right-0 bg-white border-b shadow flex items-center justify-between px-4 sm:px-6 py-3 z-30 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
  
              {/* === heading section === */}
              <div className="flex items-center">
              <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle sidebar"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-2xl text-gray-700"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex flex-col ml-2">
              <h1 className="text-lg font-semibold text-black" >
              {title}
              </h1>        
              </div>
              </div>
 
 {/* ==== search section ==== */}
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
    {/* Search Input */}
    <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full lg:w-64 shadow-sm">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="w-4 h-4 text-gray-400 mr-2"
      />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none text-sm placeholder-gray-400 bg-transparent"
      />
    </div>
    </div>
  
              <div className="flex items-center space-x-6">
             
                  {/* === messages Icon section === */}
                  <button className="relative" aria-label="Messages">
                    <img src={message} alt="message" className="w-5 h-4" />
                  </button>
  
                  {/* === Notification icon section === */}
                  <button className="relative" aria-label="Notifications">
                    <img src={notification} alt="notification" className="w-5 h-5" />
                  </button>
  
                  {/* === user profile section === */}
                  <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                          <img src={userprofile} alt="user profile" className="w-6 h-6" />
                      </div>
                  </div>
  
              </div>
          </header>
      )
}


