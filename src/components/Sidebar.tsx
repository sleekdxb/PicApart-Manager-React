import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/images/logo.png';
import dashboardIcon from '../assets/images/dashboard.png';
import dealerImg from '../assets/images/dealer management.png';
import garageImg from '../assets/images/Garage.png';
import subscriptionImg from '../assets/images/subscription.png';
import { clearAuth, logoutStaff } from "../services/authService";



interface SidebarProps {
  collapsed: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Dashboard(Overview)", path: "/dashboard", icon: dashboardIcon },
  { name: "Dealer Management", path: "/dealer-management", icon:dealerImg},
  { name: "Garage Management", path: "/garage-management", icon:garageImg},
  { name: "Subscriptions & Billing", path: "/subscriptions", icon:subscriptionImg},
];

export default function Sidebar({ collapsed, isOpen, onClose }: SidebarProps) {


  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogoutClick() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const res = await logoutStaff();
      try { console.log('[Sidebar] Logout result', res); } catch {}
    } catch (e) {
      try { console.error('[Sidebar] Logout error', e); } catch {}
    } finally {
      clearAuth();
      try { localStorage.clear(); } catch {}
      navigate('/login');
      onClose();
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      {/* === Mobile Overlay === */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* === Sidebar === */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r shadow flex flex-col z-40 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* === Logo === */}
        <div className="flex items-center px-6 py-4">
          <img
            src={logo}
            alt="Sleek logo"
            className={`transition-all duration-300 ${
              collapsed ? "w-10 mx-auto" : "w-auto h-12"
            }`}
          />
        </div>

        {/* === Menu === */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "space-x-3"
                    } px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "border-l-4 border-[#028174] bg-[#E6F0F5] text-[#028174]"
                        : "text-gray-700 hover:bg-gray-100" 
                    }`}
                  >
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* === Logout === */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-center"} px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {!collapsed ? (isLoggingOut ? 'Logging out...' : 'Logout') : (isLoggingOut ? '...' : 'Logout')}
          </button>
        </div>
      </aside>
    </>
  );
}
 

