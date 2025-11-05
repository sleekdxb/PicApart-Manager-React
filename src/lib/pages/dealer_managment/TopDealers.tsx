import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import CommonNavbar from '../../../components/CommonNavbar';

import searchIcon from "../../../assets/images/searchIcon2.png";
import eyeIcon from "../../../assets/images/Eye.png";
import DealerCard from "./component/DealerCard";
import { fetchDealerStatistics, fetchAccounts, type TopDealer, type Account, type Vendor } from "../../../services/dealerManagementService";
import { getStoredAuth } from "../../../services/authService";

export default function TopDealers() {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const handleToggleSidebar = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen((prev) => !prev);
        } else {
            setCollapsed((prev) => !prev);
        }
    };

    const handleViewClick = () => {
        navigate('/dealer-management');
    };

    // Fetch all top dealers
    const [topDealers, setTopDealers] = useState<TopDealer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function loadStatistics() {
            console.log("[TopDealers] Starting to load statistics...");
            
            const auth = getStoredAuth();
            if (!auth?.data?.staff?.staff_id) {
                console.error("[TopDealers] No staff ID found in auth");
                setError('Staff ID not found. Please login again.');
                setLoading(false);
                return;
            }

            console.log("[TopDealers] Staff ID found:", auth.data.staff.staff_id);
            setLoading(true);
            setError(null);
            try {
                console.log("[TopDealers] Calling fetchDealerStatistics...");
                const res = await fetchDealerStatistics(auth.data.staff.staff_id);
                if (cancelled) {
                    console.log("[TopDealers] Request was cancelled");
                    return;
                }
                
                console.log("[TopDealers] Full API response:", JSON.stringify(res, null, 2));
                console.log("[TopDealers] Response status:", res.status);
                console.log("[TopDealers] Response data length:", res.data?.length);
                
                if (res.status && res.data && res.data.length > 0) {
                    // Extract top dealers from all data items
                    const dealers: TopDealer[] = [];
                    
                    res.data.forEach((item, idx) => {
                        console.log(`[TopDealers] Processing item ${idx}:`, item);
                        if (item.top_dealers) {
                            const td: any = item.top_dealers as any;
                            if (Array.isArray(td)) {
                                console.log(`[TopDealers] Item ${idx} - top_dealers is array with length`, td.length);
                                dealers.push(...td);
                            } else {
                                console.log(`[TopDealers] Item ${idx} - top_dealers is object`);
                                dealers.push(td);
                            }
                        } else {
                            console.warn(`[TopDealers] Item ${idx} - No top_dealers found`);
                        }
                    });
                    
                    console.log("[TopDealers] Total dealers extracted:", dealers.length);
                    console.log("[TopDealers] Extracted dealers array:", JSON.stringify(dealers, null, 2));
                    setTopDealers(dealers);
                } else {
                    console.warn("[TopDealers] No data received or invalid response:", {
                        status: res.status,
                        dataLength: res.data?.length,
                        message: res.message
                    });
                    setTopDealers([]);
                }
            } catch (e: any) {
                if (cancelled) {
                    console.log("[TopDealers] Request was cancelled during error handling");
                    return;
                }
                console.error("[TopDealers] Error loading statistics:", e);
                setError(e?.message || 'Failed to load top dealers');
                setTopDealers([]);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                    console.log("[TopDealers] Loading completed");
                }
            }
        }
        loadStatistics();
        return () => { 
            console.log("[TopDealers] Cleanup: cancelling request");
            cancelled = true; 
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* === Sidebar === */}
            <Sidebar
                collapsed={collapsed}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            
            {/* === Navbar with Toggle Button === */}
            <CommonNavbar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} title="Dealer Management" />

            {/* === Main Content === */}
            <main
                className={`p-6 mt-10 transition-all duration-300 ${
                    collapsed ? "md:ml-20" : "md:ml-64"
                }`}
            > 
                {/* ========== top dealers cards ============= */}
                <div className="mt-4 flex justify-between items-center">
                    <h3 className="text-md font-semibold text-black">More Dealers</h3>
                    <button onClick={handleViewClick}
                        className="px-2 py-3  font-semibold text-sm text-[#028174]">Cancel</button>
                </div>

                {/* ==== search section ==== */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:col-span-4 ">
                        {/* Search Input */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full shadow-sm">
                            <img
                                src={searchIcon}
                                alt="Search Icon"
                                className="w-4 h-4 text-gray-400 mr-2"
                            />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                className="flex-1 outline-none text-sm placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>
                    {/* ==== subscription === */}
                    <div className="col-span-1 border rounded px-3 py-2 gap-3 shadow bg-white border-gray-200 ">
                        <label className="font-semibold text-gray-700">Subscription</label>
                        <select className="focus:outline-none">
                            <option value=""></option>
                        </select>
                    </div>
                    {/* ======= location ========= */}
                    <div className="col-span-1 border rounded px-3 py-2 gap-3 shadow bg-white border-gray-200 ">
                        <label className="font-semibold text-gray-700">Location</label>
                        <select className="focus:outline-none">
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                {/* ===== grid cards section ====  */}
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading top dealers...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : topDealers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                        {topDealers.map((dealer, index) => {
                            // Calculate average rating from scoring (0-5 scale)
                            const scoring = dealer.scoring || {} as any;
                            const listingQuality = (scoring["Listing Quality"] ?? 0) as number;
                            const responsiveness = (scoring["Responsiveness"] ?? 0) as number;
                            const engagement = (scoring["Engagement"] ?? 0) as number;
                            const stockUpdateRate = (scoring["Stock Update Rate"] ?? 0) as number;
                            const avgScore = Math.round(
                                (listingQuality + responsiveness + engagement + stockUpdateRate) / 4
                            );
                            // Determine plan based on score
                            const planLabel = avgScore >= 4 ? "Premium" : avgScore >= 3 ? "Pro" : "Basic";
                            const planClassName = 
                                planLabel === "Premium" 
                                    ? "px-2 py-3 mt-2 text-sm text-[#9333EA] bg-[#F2E7FF] border rounded"
                                    : planLabel === "Pro"
                                    ? "px-4 py-3 mt-2 text-sm text-[#3E38DA] bg-[#DBEAFE] border rounded"
                                    : "px-4 py-3 mt-2 text-sm text-[#CA8A04] bg-[#FEF9C3] border rounded";
                            
                            // Format login date - the API returns '25-10-19 12:42:07' format
                            const formatLoginDate = (loginStr: string) => {
                                if (!loginStr) return 'N/A';
                                try {
                                    const [datePart, timePart] = loginStr.split(' ');
                                    const [day, month, year] = datePart.split('-');
                                    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
                                    const date = new Date(`${fullYear}-${month}-${day} ${timePart}`);
                                    if (!isNaN(date.getTime())) {
                                        return date.toLocaleDateString();
                                    }
                                } catch (e) {
                                    // If parsing fails, return the original string
                                }
                                return loginStr;
                            };
                            
                            // Transform TopDealer to Account-like structure for navigation
                            const handleViewClick = async () => {
                                // Try to find the full account by matching vendor_id
                                let accountData: Account | null = null;
                                
                                try {
                                    // Try to fetch accounts and search for matching vendor_id
                                    const allAccountsResponse = await fetchAccounts(100, 1);
                                    if (allAccountsResponse?.data) {
                                        for (const acc of allAccountsResponse.data) {
                                            const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                                            if (vendor?.vend_id === dealer.vendor_id) {
                                                accountData = acc;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    // If still not found, try more pages
                                    if (!accountData && allAccountsResponse?.last_page && allAccountsResponse.last_page > 1) {
                                        for (let page = 2; page <= Math.min(allAccountsResponse.last_page, 10); page++) {
                                            const pageResponse = await fetchAccounts(100, page);
                                            if (pageResponse?.data) {
                                                for (const acc of pageResponse.data) {
                                                    const vendor = Array.isArray(acc.vendor) && acc.vendor.length > 0 ? acc.vendor[0] : undefined;
                                                    if (vendor?.vend_id === dealer.vendor_id) {
                                                        accountData = acc;
                                                        break;
                                                    }
                                                }
                                                if (accountData) break;
                                            }
                                        }
                                    }
                                } catch (error) {
                                    console.error('[TopDealers] Error fetching account data:', error);
                                }
                                
                                // If still not found, create a complete Account structure from TopDealer data
                                if (!accountData) {
                                    const vendorData: Vendor = {
                                        id: 0,
                                        acc_id: dealer.vendor_id || '',
                                        vend_id: dealer.vendor_id || '',
                                        business_name: dealer.vendor_name || null,
                                        address: null,
                                        location: null,
                                        long: null,
                                        lat: null,
                                        country: null,
                                        official_email: dealer.email || null,
                                        official_phone: null,
                                        owner_id_number: null,
                                        owner_id_full_name: null,
                                        trade_license_number: null,
                                        profile_doc_state_array_id: null,
                                        state_position: null,
                                        state_id: null,
                                        files_id_array: [],
                                        main: 1,
                                        total_listing: 0,
                                        TotalListingRequested: 0,
                                        total_listing_conver: null,
                                        listing_performance: {},
                                        total_imperssions: 0,
                                        total_clikcs: 0,
                                        total_branches: 0,
                                        created_at: new Date().toISOString(),
                                        updated_at: new Date().toISOString(),
                                        sub_statistic: {
                                            login: dealer.activity?.logins ? String(dealer.activity.logins) : undefined,
                                            request_part_count: dealer.activity?.total_requests ? String(dealer.activity.total_requests) : undefined,
                                            total_match: dealer.activity?.match_rate ? String(dealer.activity.match_rate) : undefined,
                                            chat_call_count: undefined,
                                            contact_rate: dealer.activity?.contact_rate ? String(dealer.activity.contact_rate) : undefined,
                                            last_active: dealer.activity?.logins || undefined,
                                        },
                                        media_files: [],
                                        vendor_state: [],
                                    };
                                    
                                    accountData = {
                                        acc_id: dealer.vendor_id || '',
                                        email: dealer.email || null,
                                        phone: null,
                                        account_type: null,
                                        action_state_id: null,
                                        created_at: new Date().toISOString(),
                                        updated_at: new Date().toISOString(),
                                        vendor: [vendorData],
                                        memberships: [],
                                        session: [],
                                        account_states: [],
                                    };
                                }
                                
                                navigate('/dealer-management/AccountOwner', { state: { account: accountData } });
                            };
                            
                            return (
                                <DealerCard
                                    key={dealer.vendor_id || index}
                                    name={dealer.vendor_name || '-'}
                                    email={dealer.email || '-'}
                                    rating={avgScore}
                                    metrics={[
                                        { label: 'Requests', value: String(dealer.activity?.total_requests ?? 0) },
                                        { label: 'Contact Rate', value: `${String(dealer.activity?.contact_rate ?? 0)}%` },
                                        { label: 'Match Rate', value: `${String(dealer.activity?.match_rate ?? 0)}%` },
                                        { label: 'Last Login', value: dealer.activity?.logins ? formatLoginDate(dealer.activity.logins) : 'N/A' },
                                    ]}
                                    planLabel={planLabel}
                                    planClassName={planClassName}
                                    onViewClick={handleViewClick}
                                    eyeIcon={eyeIcon}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">No top dealers available</div>
                )}
            </main>
        </div>
    )
}